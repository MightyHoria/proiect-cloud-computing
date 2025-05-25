Proiect Cloud Computing

Magazin in Cloud, Horia-Matei Bogdan, grupa 1132 

### PREZENTARE PROIECT IN SCREENSHOTURILE DE MAI JOS ###

### LINK PUBLICARE: https://proiect-cloud-computing-h599ro469-mightyhorias-projects.vercel.app/ ###


Introducere

Acest proiect este o aplicație web de tip CRUD (Create, Read, Update, Delete) care simulează un mic magazin de produse. Utilizatorii pot adăuga, vizualiza, edita și șterge produse prin intermediul unei interfețe grafice moderne. Backend-ul este construit cu Node.js și Express, iar datele sunt stocate în MongoDB Atlas. Frontend-ul este implementat cu HTML, CSS și JavaScript pur.

Descriere problemă (0,25p)

În contextul unui magazin online, gestionarea produselor trebuie să permită operații de bază asupra catalogului: adăugare de noi produse, afișare a listei de produse, actualizare a informațiilor existente și ștergerea produselor care nu mai sunt disponibile.

Descriere API (0,25p)

Metode HTTP și endpoint-uri pentru resursa “products”:
POST /api/products/ – Creare produs nou
GET /api/products/ – Returnează lista tuturor produselor
PUT /api/products/:id – Actualizează produsul cu ID-ul dat
DELETE /api/products/:id – Șterge produsul cu ID-ul dat

Exemplu creare produs:

Request: POST /api/products/
Body JSON: { "name": "Tricou Sport", "description": "Bumbac 100%", "price": 79.99 }
Response 201: { "_id": "...", "name": "Tricou Sport", "description": "Bumbac 100%", "price": 79.99, "createdAt": "...", "updatedAt": "..." }

Exemplu citire produse:

Request: GET /api/products/
Response 200: [ { "_id": "...", "name": "Prod1", "price": 10 }, { "_id": "...", "name": "Prod2", "price": 20 } ]

Flux de date (0,25p)


Utilizatorul completează formularul din frontend și apasă “Salvează”.

Frontend-ul trimite o cerere fetch() către endpoint-ul corespunzător (POST, PUT, DELETE, GET).

Express recepționează cererea, o trimite prin router și apelează metoda Mongoose corespunzătoare.

MongoDB Atlas stochează sau returnează documentele în/din baza de date “myDatabase”, colecția “products”.

Express trimite răspunsul JSON înapoi la frontend.

Frontend-ul actualizează DOM-ul și afișează lista de produse.

Autentificare și autorizare:

Proiectul nu implementează autentificare; toate rutele sunt publice.

Capturi ecran aplicație (0,25p)

![image](https://github.com/user-attachments/assets/72eb648f-b3f1-4605-92ca-a57df954a6af)
![image](https://github.com/user-attachments/assets/71acd163-e9a3-4474-8854-f5ffe7b89a0c)
![image](https://github.com/user-attachments/assets/05e834a3-5718-4c35-a96d-20db84cc0e31)
![image](https://github.com/user-attachments/assets/4c564117-068b-4d94-b497-a2c0b550bf2c)


Referințe

https://expressjs.com/

https://mongoosejs.com/

https://www.mongodb.com/cloud/atlas

https://vercel.com/
