# Project instructions

## Primary UI/UX skill

- For every task that changes the appearance, layout, interaction, responsiveness, accessibility, animation, typography, color, navigation, forms, charts, or other user-facing behavior, use the project-local `ui-ux-pro-max` skill in `.agents/skills/ui-ux-pro-max/` as the primary design and UX guidance.
- Follow `.agents/skills/ui-ux-pro-max/SKILL.md`, including generating a design system before creating a new page or application and checking its pre-delivery rules before handing off UI work.
- In the upstream skill documentation, interpret `${CLAUDE_PLUGIN_ROOT}/.claude/skills/ui-ux-pro-max` as this project's absolute `.agents/skills/ui-ux-pro-max` directory. Invoke `scripts/search.py` from that resolved project-local path.
- Detect the project's actual frontend stack before requesting stack-specific guidance. Do not assume a stack when the repository does not yet contain one.
- Preserve explicit product requirements and existing project conventions. Use the skill to inform implementation decisions, not to override user requirements.
