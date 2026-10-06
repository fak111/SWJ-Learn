#!/bin/sh
# 口语训练数据（试卷、录音、反馈、映射表、报告）和 R2 互相同步：swj-learn-audio/eng/
#   sh speak/sync.sh push   # 本机 → R2：练完一轮就推一次
#   sh speak/sync.sh pull   # R2 → 本机：换电脑先拉，再 python3 speak/server.py
# 需要 ~/.zshrc 里的 SWJ_R2_ACCESS_KEY_ID / SWJ_R2_SECRET_ACCESS_KEY / SWJ_R2_ENDPOINT，和 uv（uvx 临时拉 awscli）。
# ponytail: 不带 --delete，两边只增不删；本机删掉的录音 R2 上还在，要清再手动删
set -eu
DATA="${SPEAK_DATA:-$HOME/temp/eng}"
REMOTE=s3://swj-learn-audio/eng
: "${SWJ_R2_ACCESS_KEY_ID:?先在 ~/.zshrc 里配 SWJ_R2_*}" "${SWJ_R2_SECRET_ACCESS_KEY:?}" "${SWJ_R2_ENDPOINT:?}"
export AWS_ACCESS_KEY_ID="$SWJ_R2_ACCESS_KEY_ID" AWS_SECRET_ACCESS_KEY="$SWJ_R2_SECRET_ACCESS_KEY" AWS_DEFAULT_REGION=auto
aws() { uvx --from awscli aws --endpoint-url "$SWJ_R2_ENDPOINT" "$@"; }

case "${1:-}" in
  push) aws s3 sync "$DATA" "$REMOTE" --exclude '.*' --exclude '*/.*' --exclude 'sessions.bak-*' ;;  # 不传写到一半的临时文件和本机备份
  pull) mkdir -p "$DATA" && aws s3 sync "$REMOTE" "$DATA" ;;
  *) echo "用法: sh speak/sync.sh push|pull" >&2; exit 2 ;;
esac
