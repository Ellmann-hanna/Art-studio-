#!/usr/bin/env python3
"""
Daily Game Design Job Search for Caroline Zhou
USC graduate, master's student - focused on Level Design / Area Design
"""

import os
import json
import urllib.request
import urllib.parse
from datetime import datetime, date

# ── Adzuna API (free tier: https://developer.adzuna.com/) ─────────────────────
ADZUNA_APP_ID  = os.environ.get("ADZUNA_APP_ID", "")
ADZUNA_APP_KEY = os.environ.get("ADZUNA_APP_KEY", "")
ADZUNA_COUNTRY = "us"
ADZUNA_BASE    = f"https://api.adzuna.com/v1/api/jobs/{ADZUNA_COUNTRY}/search"

# ── Search configuration ──────────────────────────────────────────────────────
SEARCH_QUERIES = [
    "level designer entry level",
    "junior level designer game",
    "area designer game studio",
    "environment designer game entry level",
    "associate level designer",
    "world designer game entry level",
    "game designer level design",
]

RELEVANT_KEYWORDS = {
    "level design", "level designer", "area design", "area designer",
    "environment design", "world building", "world design", "game design",
    "unreal engine", "unity", "ue5", "ue4", "game dev", "game developer",
}

# Direct search URLs for major job boards (always included regardless of API)
SEARCH_URLS = {
    "LinkedIn": [
        "https://www.linkedin.com/jobs/search/?keywords=junior+level+designer+game&f_E=1%2C2",
        "https://www.linkedin.com/jobs/search/?keywords=area+designer+game+studio&f_E=1%2C2",
        "https://www.linkedin.com/jobs/search/?keywords=entry+level+environment+designer+game&f_E=1%2C2",
    ],
    "Indeed": [
        "https://www.indeed.com/jobs?q=junior+level+designer+games&l=&explvl=entry_level",
        "https://www.indeed.com/jobs?q=area+designer+game+studio&l=&explvl=entry_level",
        "https://www.indeed.com/jobs?q=entry+level+game+designer+level+design",
    ],
    "Glassdoor": [
        "https://www.glassdoor.com/Job/junior-level-designer-jobs-SRCH_KO0,21.htm",
        "https://www.glassdoor.com/Job/entry-level-game-designer-jobs-SRCH_KO0,25.htm",
    ],
    "Hitmarker (Game Industry Jobs)": [
        "https://hitmarker.net/jobs?q=level+designer&experience=entry-level",
        "https://hitmarker.net/jobs?q=area+designer&experience=entry-level",
    ],
    "Game Developer (Gamasutra)": [
        "https://jobs.gamedeveloper.com/jobs?q=level+designer&experience=entry",
        "https://jobs.gamedeveloper.com/jobs?q=area+designer",
    ],
    "Remote Game Jobs": [
        "https://remotegamejobs.com/?s=level+designer",
        "https://remotegamejobs.com/?s=area+designer",
    ],
}

# Major studio career pages worth checking directly
STUDIO_CAREER_PAGES = [
    ("Riot Games",        "https://www.riotgames.com/en/work-with-us/jobs#department=Design"),
    ("Naughty Dog",       "https://www.naughtydog.com/careers"),
    ("Insomniac Games",   "https://insomniac.games/careers/"),
    ("Bungie",            "https://careers.bungie.com/"),
    ("Epic Games",        "https://www.epicgames.com/site/en-US/careers/jobs?department=Design"),
    ("Blizzard",          "https://careers.blizzard.com/en-us/openings/?department=Design"),
    ("EA",                "https://jobs.ea.com/en_US/careers?domain=electronicarts.com"),
    ("Ubisoft",           "https://www.ubisoft.com/en-us/company/careers/apply"),
    ("Sony Santa Monica", "https://sonyinteractive.com/en/our-studios/santa-monica-studio/careers"),
    ("Xbox/Microsoft",    "https://jobs.microsoft.com/en-us/search?q=level+designer"),
    ("2K Games",          "https://2k.com/en-US/careers/"),
    ("Bethesda",          "https://jobs.bethesda.net/"),
    ("CD Projekt Red",    "https://www.cdprojektred.com/en/career"),
    ("Rockstar Games",    "https://www.rockstargames.com/careers"),
    ("Valve",             "https://www.valvesoftware.com/en/jobs"),
]


def fetch_adzuna(query: str, page: int = 1, results_per_page: int = 20) -> list[dict]:
    if not ADZUNA_APP_ID or not ADZUNA_APP_KEY:
        return []
    params = urllib.parse.urlencode({
        "app_id":          ADZUNA_APP_ID,
        "app_key":         ADZUNA_APP_KEY,
        "results_per_page": results_per_page,
        "what":            query,
        "content-type":    "application/json",
        "sort_by":         "date",
    })
    url = f"{ADZUNA_BASE}/{page}?{params}"
    try:
        with urllib.request.urlopen(url, timeout=10) as resp:
            data = json.loads(resp.read())
            return data.get("results", [])
    except Exception as e:
        print(f"  [warn] Adzuna fetch failed for '{query}': {e}")
        return []


def score_job(job: dict) -> int:
    """Score a job by relevance to level/area design."""
    text = (
        job.get("title", "") + " " +
        job.get("description", "") + " " +
        job.get("category", {}).get("label", "")
    ).lower()
    score = sum(2 if kw in text else 0 for kw in RELEVANT_KEYWORDS)
    # Boost for entry-level signals
    if any(w in text for w in ("entry", "junior", "associate", "new grad", "graduate")):
        score += 3
    # Boost for remote
    if "remote" in text:
        score += 1
    return score


def deduplicate(jobs: list[dict]) -> list[dict]:
    seen = set()
    unique = []
    for j in jobs:
        key = (j.get("title", "").lower(), j.get("company", {}).get("display_name", "").lower())
        if key not in seen:
            seen.add(key)
            unique.append(j)
    return unique


def format_job(job: dict, idx: int) -> str:
    title    = job.get("title", "N/A")
    company  = job.get("company", {}).get("display_name", "N/A")
    location = job.get("location", {}).get("display_name", "N/A")
    url      = job.get("redirect_url", "#")
    created  = job.get("created", "")[:10] if job.get("created") else "N/A"
    salary   = ""
    sal_min  = job.get("salary_min")
    sal_max  = job.get("salary_max")
    if sal_min and sal_max:
        salary = f" | 💰 ${int(sal_min):,} – ${int(sal_max):,}/yr"
    remote_flag = " 🌐 Remote" if "remote" in (job.get("title","") + job.get("description","")).lower() else ""
    desc_raw = job.get("description", "")
    desc = desc_raw[:280].replace("\n", " ").strip()
    if len(desc_raw) > 280:
        desc += "…"
    return (
        f"### {idx}. [{title}]({url})\n"
        f"**{company}** — {location}{remote_flag}{salary}\n"
        f"Posted: {created}\n\n"
        f"> {desc}\n"
    )


def categorize(jobs: list[dict]) -> tuple[list, list, list]:
    scored = [(score_job(j), j) for j in jobs]
    scored.sort(key=lambda x: -x[0])
    top, good, stretch = [], [], []
    for score, j in scored:
        if score >= 8:
            top.append(j)
        elif score >= 4:
            good.append(j)
        else:
            stretch.append(j)
    return top, good, stretch


def build_report(top: list, good: list, stretch: list) -> str:
    today = date.today().strftime("%B %d, %Y")
    total = len(top) + len(good) + len(stretch)

    lines = [
        f"# 🎮 Game Design Job Search — {today}",
        f"**For:** Caroline Zhou | USC Graduate · Master's Student · Level / Area Design Focus",
        f"**Total listings found via API:** {total}",
        "",
        "---",
        "",
    ]

    if top:
        lines += ["## ⭐ Top Picks (Best fit for your profile)", ""]
        for i, j in enumerate(top[:10], 1):
            lines.append(format_job(j, i))
    else:
        lines += ["## ⭐ Top Picks", "_No strong matches via API today — check board links below._", ""]

    if good:
        lines += ["---", "## ✅ Strong Matches", ""]
        for i, j in enumerate(good[:15], 1):
            lines.append(format_job(j, i))

    if stretch:
        lines += ["---", "## 🚀 Stretch Roles (Slightly senior — worth a shot)", ""]
        for i, j in enumerate(stretch[:8], 1):
            lines.append(format_job(j, i))

    # Always include curated board links
    lines += [
        "---",
        "## 🔗 Live Job Board Searches — Click to Browse Now",
        "",
        "_These links open pre-configured searches on major job boards. "
        "Bookmark them or check daily!_",
        "",
    ]
    for board, urls in SEARCH_URLS.items():
        lines.append(f"### {board}")
        for url in urls:
            label = url.split("?")[0].split("/")[-1].replace("+", " ").replace("-", " ").title() or "Search"
            lines.append(f"- [{url}]({url})")
        lines.append("")

    # Studio career pages
    lines += [
        "---",
        "## 🏢 Major Studio Career Pages",
        "",
        "Check these directly — big studios often don't post to aggregators:",
        "",
    ]
    for name, url in STUDIO_CAREER_PAGES:
        lines.append(f"- **[{name}]({url})**")

    # Tips section
    lines += [
        "",
        "---",
        "## 💡 Tips for Caroline",
        "",
        "- **Portfolio first:** Ensure your USC portfolio site is linked in every application.",
        "- **USC network:** Check Handshake (USC's job platform) for game industry postings exclusive to USC students.",
        "- **Keywords to use:** 'Level Designer', 'Environment Designer', 'World Builder', 'Area Designer', 'Gameplay Designer (Environment)'.",
        "- **Tools to highlight:** Unreal Engine 5, Unity, Blender, Maya, Houdini, Perforce, Jira — mention any you know.",
        "- **Remote roles:** Especially worth targeting as a current student — many junior design roles are now remote.",
        "- **Game jams:** Itch.io, Global Game Jam, Ludum Dare — active participation strengthens your application.",
        "",
        "---",
        f"_Generated automatically on {today}. "
        "This issue is created daily to keep job listings current._",
    ]

    return "\n".join(lines)


def main():
    print("Starting daily game design job search for Caroline Zhou...")
    all_jobs: list[dict] = []

    if ADZUNA_APP_ID and ADZUNA_APP_KEY:
        print(f"Searching {len(SEARCH_QUERIES)} queries via Adzuna API...")
        for query in SEARCH_QUERIES:
            print(f"  Querying: '{query}'")
            results = fetch_adzuna(query)
            all_jobs.extend(results)
            print(f"    → {len(results)} results")
    else:
        print("No Adzuna API credentials set — report will include board links only.")
        print("Add ADZUNA_APP_ID and ADZUNA_APP_KEY as GitHub secrets for live listings.")

    all_jobs = deduplicate(all_jobs)
    print(f"Unique jobs after dedup: {len(all_jobs)}")

    top, good, stretch = categorize(all_jobs)
    report = build_report(top, good, stretch)

    # Write report to file (GitHub Actions will create an issue from it)
    output_path = os.environ.get("REPORT_PATH", "job_report.md")
    with open(output_path, "w") as f:
        f.write(report)

    print(f"Report written to {output_path}")
    print(f"Summary: {len(top)} top picks, {len(good)} strong matches, {len(stretch)} stretch roles")


if __name__ == "__main__":
    main()
