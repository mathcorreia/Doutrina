@component('mail::message')
# Olá, {{ $proposal->freelancer->user->name }}!

Temos uma ótima notícia! Sua proposta para o projeto **"{{ $proposal->project->title }}"** foi aceita pela empresa **{{ $proposal->project->company->user->name }}**.

**Detalhes da Proposta Aceita:**
- **Valor:** R$ {{ number_format($proposal->valor, 2, ',', '.') }}

Parabéns por mais esta conquista! Você pode entrar em contato com a empresa através do e-mail: {{ $proposal->project->company->user->email }} para alinhar os próximos passos.

Obrigado,<br>
Equipe {{ config('app.name') }}
@endcomponent
