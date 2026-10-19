# TIMTIM — dados oficiais com proveniência

O workflow `Sincronizar dados publicos TIMTIM` executa diariamente (09:17 UTC, quando o GitHub Actions disponibilizar o agendamento) e manualmente. Coleta APIs oficiais de **deputados federais** e **senadores**, normaliza IDs, registra URLs de origem, horário de consulta e SHA-256 do conjunto.

Arquivos atuais: `camara_deputados.json`, `senado_senadores.json`, `manifest.json`. Mudanças são arquivadas em `historico/<fonte>-AAAA-MM-DD.json` e registradas pelo histórico Git, que preserva versões anteriores. Se uma fonte falhar ou retornar zero, a coleta mantém o arquivo anterior e marca erro no manifest; não substitui dados por listas vazias.

Importante: remuneração, data de posse e população completa de servidores NÃO são importadas nesta fase. Ficam nulas (e não estimadas). Não coletar CPF ou endereços residenciais. Conectores de Executivo Federal exigem token `chave-api-dados` e devem ser adicionados com segredo no Actions, nunca no site. Judiciário, estados e municípios precisam de conectores separados por órgão. Verificar política de retenção e limites antes de aumentar escala.
