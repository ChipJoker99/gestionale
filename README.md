# Document Management Application

## Descrizione

Questa applicazione JavaScript è progettata per la gestione dei documenti. Include funzionalità per verificare i nomi dei documenti, recuperare il titolo e il contenuto dei documenti, e gestire gli utenti e i loro documenti personali. Il codice è stato sviluppato con un'architettura orientata agli oggetti per garantire modularità e manutenibilità.

## Funzionalità Principali

- **Verifica del Nome del Documento:** Assicura che i nomi dei documenti superino una lunghezza minima.
- **Recupero del Titolo e del Contenuto:** Consente di estrarre il titolo e il contenuto dei documenti dal database.
- **Gestione degli Utenti:** Permette di associare documenti a specifici utenti e recuperare documenti per utente.

## Struttura del Codice

### Document Class

La classe `Document` è responsabile della gestione dei documenti. Include metodi per verificare il nome del documento, recuperare il titolo e il contenuto, e ottenere tutti i documenti dal database.

#### Metodi Principali

- **constructor(name, user):** Inizializza un nuovo documento con un nome e un utente.
- **checkName(name):** Verifica che il nome del documento sia più lungo di 5 caratteri.
- **getTitle():** Recupera il titolo del documento dal database.
- **getContent():** Recupera il contenuto del documento dal database.
- **getAllDocuments():** Recupera tutti i documenti dal database.

### User Class

La classe `User` è responsabile della gestione degli utenti e dei loro documenti. Include metodi per creare nuovi documenti e recuperare i documenti di un utente specifico.

#### Metodi Principali

- **makeNewDocument(name):** Crea un nuovo documento per l'utente.
- **getMyDocuments():** Recupera tutti i documenti associati all'utente corrente.

## Esempio di Utilizzo

```javascript
const user = new User();
const doc = user.makeNewDocument("Progetto Importante");

(async () => {
    try {
        console.log(await doc.getTitle());
        console.log(await doc.getContent());
        const userDocs = await user.getMyDocuments();
        console.log("Documenti dell'utente:", userDocs);
    } catch (error) {
        console.error(error);
    }
})();
