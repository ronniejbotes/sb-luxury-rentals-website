#!/usr/bin/env bash
#
# Publish the static build to the `deploy` branch.
#
# Hostinger's built-in Git deploy clones a whole repo into public_html, so the
# branch it points at must have index.html at its ROOT. `main` can't be that
# branch: it would publish src/, package.json and README.md to the open web and
# bury the site under /dist/. So the built site gets its own branch.
#
# History is preserved deliberately. Hostinger runs `git pull` on every deploy
# after the first, and a force-pushed orphan commit would give it an unrelated
# history and break that pull.
#
# Usage: npm run deploy

set -euo pipefail

BRANCH="deploy"
OUT="dist"
WT=".git/tmp-deploy-worktree"

cd "$(git rev-parse --show-toplevel)"

if [ ! -f "$OUT/index.html" ]; then
  echo "error: $OUT/index.html is missing. Run 'npm run build' first." >&2
  exit 1
fi

# Without these two the site still loads but the quote form silently stops
# reaching info@sbluxuryrentals.co.za, and the old URLs stop redirecting.
# Losing them is invisible until a lead goes missing, so refuse instead.
for required in "$OUT/send-quote.php" "$OUT/.htaccess"; do
  if [ ! -f "$required" ]; then
    echo "error: $required is missing — the quote form would break." >&2
    exit 1
  fi
done

# Always start from a clean worktree, including after an interrupted run.
git worktree remove --force "$WT" 2>/dev/null || true
rm -rf "$WT"

git fetch origin "$BRANCH" 2>/dev/null || true

if git show-ref --verify --quiet "refs/remotes/origin/$BRANCH"; then
  git worktree add -B "$BRANCH" "$WT" "origin/$BRANCH" >/dev/null
elif git show-ref --verify --quiet "refs/heads/$BRANCH"; then
  git worktree add "$WT" "$BRANCH" >/dev/null
else
  # First run: orphan branch, so the site's history is independent of source.
  git worktree add --detach "$WT" >/dev/null
  git -C "$WT" checkout --orphan "$BRANCH" >/dev/null 2>&1
  git -C "$WT" rm -rf . >/dev/null 2>&1 || true
fi

# --delete so files dropped from a build are dropped from the branch too.
rsync -a --delete --exclude=".git" "$OUT"/ "$WT"/

git -C "$WT" add -A

if git -C "$WT" diff --cached --quiet; then
  echo "No changes to publish — deploy branch already matches this build."
else
  git -C "$WT" commit -q -m "Build from $(git rev-parse --short HEAD) on $(git rev-parse --abbrev-ref HEAD)"
  git -C "$WT" push -q origin "$BRANCH"
  echo "Published $(git -C "$WT" rev-parse --short HEAD) to origin/$BRANCH."
fi

git worktree remove --force "$WT"
echo "Done. Trigger the deploy in hPanel (or let the webhook do it)."
