export function buildBrief({ name, email, idea }) {
  return `Briefing para a MCode\n\nNome: ${name.trim()}\nE-mail: ${email.trim()}\n\nProjeto:\n${idea.trim()}`;
}
