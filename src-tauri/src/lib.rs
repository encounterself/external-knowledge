use std::io::Write;
use std::process::{Command, Stdio};

const ALLOWED_BASE_URL: &str = "https://wawapii.com";

fn curl_config_value(value: &str) -> String {
    value.replace('\\', "\\\\").replace('"', "\\\"").replace('\n', "\\n").replace('\r', "\\r")
}

#[tauri::command]
fn codex_chat(base_url: String, api_key: String, request: String) -> Result<String, String> {
    let normalized = base_url.trim_end_matches('/');
    if normalized != ALLOWED_BASE_URL {
        return Err(format!("Base URL 仅允许 {ALLOWED_BASE_URL}。"));
    }
    if api_key.trim().is_empty() {
        return Err("未配置 API Key。".to_string());
    }
    let config = format!(
        "url = \"{}/chat/completions\"\nheader = \"Content-Type: application/json\"\nheader = \"Authorization: Bearer {}\"\ndata-raw = \"{}\"\n",
        ALLOWED_BASE_URL,
        curl_config_value(&api_key),
        curl_config_value(&request)
    );
    let mut child = Command::new("curl")
        .args(["--silent", "--show-error", "--fail-with-body", "--max-time", "60", "--config", "-"])
        .stdin(Stdio::piped())
        .stdout(Stdio::piped())
        .stderr(Stdio::piped())
        .spawn()
        .map_err(|error| format!("无法启动本地网络桥接：{error}"))?;
    child.stdin.take().ok_or_else(|| "无法连接本地网络桥接。".to_string())?.write_all(config.as_bytes()).map_err(|error| format!("无法发送 AI 请求：{error}"))?;
    let output = child.wait_with_output().map_err(|error| format!("AI 请求未完成：{error}"))?;
    if !output.status.success() {
        return Err(format!("AI 请求失败（{}）", output.status.code().unwrap_or(1)));
    }
    String::from_utf8(output.stdout).map_err(|error| format!("AI 返回内容不是有效 UTF-8：{error}"))
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![codex_chat])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
