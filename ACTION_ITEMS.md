# Action Items for Netlify Builds and Portfolio Improvements

## ✅ Completed

1. **Investigated Netlify build failures** - Identified root cause
2. **Created netlify.toml configuration** - Working configuration for Rollup-based builds
3. **Analyzed all open PRs** - Documented status and required fixes for each
4. **Created comprehensive documentation** - See NETLIFY_FIX_SUMMARY.md and GITHUB_ISSUES_TO_CREATE.md

## 🔴 Manual Actions Required

Due to GitHub token permission limitations, the following actions need to be performed manually:

### 1. Fix Netlify Builds on Recent PRs

#### For Vite-based PRs (#35, #36, #37)
These PRs already have `netlify.toml` but need the build command updated:

**File**: `netlify.toml`
**Change**:
```diff
[build]
-  command = "npm run build"
+  command = "npm install && npm run build"
   publish = "dist"
```

**PRs to update**:
- PR #37: `claude/resume-based-updates-01PUm1NtzpcjuErJ6xBEt97q`
- PR #36: `claude/professional-enhancements-01PUm1NtzpcjuErJ6xBEt97q`
- PR #35: `claude/upgrade-dependencies-01PUm1NtzpcjuErJ6xBEt97q`

**How to fix**:
```bash
# For each branch
git checkout <branch-name>
# Edit netlify.toml to add "npm install &&" before "npm run build"
git add netlify.toml
git commit -m "Fix Netlify build command to include npm install"
git push origin <branch-name>
```

#### For Rollup-based PRs (#33, #34)
These PRs need a `netlify.toml` file added:

**File**: Create `netlify.toml` with:
```toml
[build]
  command = "npm install && npm run build"
  publish = "public"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**PRs to update**:
- PR #34: `claude/update-bio-metadata-01PUm1NtzpcjuErJ6xBEt97q`
- PR #33: `claude/update-links-01PUm1NtzpcjuErJ6xBEt97q`

**How to fix**:
```bash
# For each branch
git checkout <branch-name>
# Copy netlify.toml from claude/fix-netlify-builds-01Nw8wqymgHmsWrunnJMkbqJ
git checkout claude/fix-netlify-builds-01Nw8wqymgHmsWrunnJMkbqJ -- netlify.toml
git add netlify.toml
git commit -m "Add Netlify configuration to fix deployment builds"
git push origin <branch-name>
```

### 2. Merge PRs Once Builds Pass

**Recommended merge order**:

1. **First**: Merge PR #35 (Vite upgrade) after fixing netlify.toml
   - This is the base for PRs #36 and #37
   - Command: After Netlify build passes, merge via GitHub UI

2. **Second**: Merge PR #36 and #37 (built on top of #35)
   - These can be merged in any order after #35
   - Command: After Netlify builds pass, merge via GitHub UI

3. **Third**: Merge PR #33 and #34 (Rollup-based)
   - These can be merged in any order
   - Command: After Netlify builds pass, merge via GitHub UI

4. **Optional**: Merge `claude/fix-netlify-builds-01Nw8wqymgHmsWrunnJMkbqJ`
   - Only if you want the fix committed separately
   - Otherwise, it's already included in the other PRs

### 3. Close Old PRs

The following PRs are from 2020-2023 and should be closed:

**Dependabot PRs to close** (security updates are outdated):
```bash
# Use GitHub UI to close these PRs, or use GitHub CLI:
gh pr close 32 --comment "Closing outdated dependency update. Will address in a comprehensive dependency upgrade."
gh pr close 31 --comment "Closing outdated dependency update. Will address in a comprehensive dependency upgrade."
gh pr close 30 --comment "Closing outdated dependency update. Will address in a comprehensive dependency upgrade."
gh pr close 29 --comment "Closing outdated dependency update. Will address in a comprehensive dependency upgrade."
gh pr close 28 --comment "Closing outdated dependency update. Will address in a comprehensive dependency upgrade."
gh pr close 27 --comment "Closing outdated dependency update. Will address in a comprehensive dependency upgrade."
gh pr close 25 --comment "Closing outdated dependency update. Will address in a comprehensive dependency upgrade."
gh pr close 24 --comment "Closing outdated dependency update. Will address in a comprehensive dependency upgrade."
gh pr close 23 --comment "Closing outdated dependency update. Will address in a comprehensive dependency upgrade."
```

**Feature PRs to close**:
```bash
gh pr close 19 --comment "Closing old test PR."
gh pr close 18 --comment "Closing old feature PR."
```

### 4. Create GitHub Issues

Use the templates in `GITHUB_ISSUES_TO_CREATE.md` to create the following issues:

**Issue 1**: Add portfolio section showcasing work at Rewiring America, Arcadia, and The Knot
```bash
gh issue create --title "Add portfolio section showcasing work at Rewiring America, Arcadia, and The Knot" \
  --label "enhancement,design" \
  --body-file <(sed -n '/^## Issue 1/,/^## Issue 2/p' GITHUB_ISSUES_TO_CREATE.md | sed '1d;$d')
```

**Issue 2**: Redesign personal splash page with modern, professional aesthetic
```bash
gh issue create --title "Redesign personal splash page with modern, professional aesthetic" \
  --label "enhancement,design" \
  --body-file <(sed -n '/^## Issue 2/,/^## Issue 3/p' GITHUB_ISSUES_TO_CREATE.md | sed '1d;$d')
```

**Issue 3**: Collect and add high-quality screenshots for portfolio projects
```bash
gh issue create --title "Collect and add high-quality screenshots for portfolio projects" \
  --label "content,assets" \
  --body-file <(sed -n '/^## Issue 3/,/^## Issue 4/p' GITHUB_ISSUES_TO_CREATE.md | sed '1d;$d')
```

**Issue 4**: Update biographical content to emphasize senior engineering experience
```bash
gh issue create --title "Update biographical content to emphasize senior engineering experience" \
  --label "content" \
  --body-file <(sed -n '/^## Issue 4/,/^$/p' GITHUB_ISSUES_TO_CREATE.md | sed '1d')
```

## 📚 Reference Documentation

- **NETLIFY_FIX_SUMMARY.md**: Detailed analysis of Netlify build failures and fixes needed for each PR
- **GITHUB_ISSUES_TO_CREATE.md**: Complete templates for GitHub issues about portfolio improvements

## 🔗 Useful Links

- Branch with working Netlify config: `claude/fix-netlify-builds-01Nw8wqymgHmsWrunnJMkbqJ`
- GitHub repo: https://github.com/veekas/meansprogress
- Netlify dashboard: (check your Netlify account for deployment status)

## ⚠️ Important Notes

1. **Wait for Netlify builds** - After fixing netlify.toml on each branch, wait for Netlify to rebuild before merging
2. **Check build status** - Each PR should show a green check mark for the Netlify deploy preview
3. **Test deployed previews** - Click through the Netlify preview link to ensure the site works correctly
4. **Merge conflicts** - If there are merge conflicts when merging PRs, resolve them carefully
5. **Dependency updates** - After closing old dependabot PRs, consider running a fresh dependency audit and update

## 🎯 Summary

**Problem**: All Netlify builds were failing because the build artifacts directory (`public/build/` or `dist/`) is gitignored, but Netlify wasn't running the build command.

**Solution**: Add or update `netlify.toml` to include the build command `npm install && npm run build`.

**Status**: Configuration created and documented. Manual intervention required to update other PR branches and perform GitHub operations (merge PRs, close old PRs, create issues) due to token permission limitations.
