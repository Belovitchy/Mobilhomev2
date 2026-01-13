🔁 SCHÉMA VISUEL SIMPLIFIÉ (À GARDER SOUS LES YEUX)

CLIENT
  ↓
CONTROLLER
  ↓
COMMAND / QUERY
  ↓
HANDLER (Application)
  ↓
REPOSITORY (Interface)
  ↓
INFRASTRUCTURE (EF / MySQL)
  ↓
DOMAIN ENTITIES
  ↓
DTO
  ↓
CLIENT

//////////////////////////////////////////////

🧠 Règle d’or (note-la quelque part)

Tout package lié à :

crypto

JWT

EF Core

MySQL

fichiers

SMTP

HTTP externe

👉 Infrastructure

///////////////////////////////////////////////
checkToken bearer
React
  ↓ (Authorization: Bearer TOKEN)
API
  ↓ Middleware JWT
  → token valide ?
      ❌ non → 401
      ✅ oui → User.Claims rempli
Controller
  ↓
Extraction ownerId depuis le token
  ↓
Chargement Owner depuis la DB
  ↓
Mapping → DTO
  ↓
200 OK
