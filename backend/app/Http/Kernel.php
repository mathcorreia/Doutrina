// backend/config/cors.php
<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'], // Certifique-se que 'api/*' está aqui
    'allowed_methods' => ['*'], // Permite todos os métodos ou especifique: ['POST', 'GET', 'OPTIONS', ...]
    'allowed_origins' => ['*'], // Permite de qualquer origem. Para produção, seja mais específico: ['http://localhost:5500', 'http://seudominiofrontend.com']
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'], // Permite todos os headers ou especifique: ['Content-Type', 'X-Requested-With', 'Authorization', 'Accept']
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false,
];