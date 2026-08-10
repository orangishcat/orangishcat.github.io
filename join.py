"""
combines all the md files in a directory into one big one that i can post on social media
"""

import re
from pathlib import Path

from natsort import natsorted

START_FOLDER = "personal-website"
PROJECT_DIR = Path(__file__).parent
START_DIR = PROJECT_DIR / "src" / "content" / "blog" / START_FOLDER
TITLE_RE = re.compile("---\ntitle: (.+)\n---", re.MULTILINE | re.DOTALL)
IMAGE_RE = re.compile(r"!\[\[.\/attachments\/(.+)\]\]")
WIDTH_RE = re.compile(r"\|\d+")

def to_asset_url(match):
    filename = WIDTH_RE.sub("", match.group(1))
    url = f"https://github.com/orangishcat/orangishcat.github.io/raw/refs/heads/main/src/content/blog/{START_FOLDER}/attachments/{filename}"
    return f"![{filename}]({url})"

def read_file(filename: Path):
    with open(START_DIR / filename) as f:
        file_content = f.read().strip()
    title_match = TITLE_RE.match(file_content)

    file_title = title_match.group(1) if title_match else filename.stem
    file_content = TITLE_RE.sub("", file_content)
    file_content = IMAGE_RE.sub(to_asset_url, file_content)
    return f"# {file_title}\n{file_content}"

files = natsorted(START_DIR.glob("*.md"))
with open(PROJECT_DIR / "out.md", "w") as w:
    w.write("\n\n---\n\n".join(read_file(f) for f in files))
