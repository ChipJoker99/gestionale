class Document {
    constructor(name, user) {
        this.checkName(name);
        this.user = user;
    }

    checkName(name){
        if (name.length <= 5) {
            throw new Error('Document name must be more than 5 characters')
        }
        this.name = name;
    }

    static get DB_COLUMNS() {
        return {
            ID: 0,
            USER_ID: 1,
            TITLE: 3,
            CONTENT: 6
        }
    };


    async getTitle() {
        try {
            const db = await Database.getInstance();
            const row = await db.query(`SELECT * FROM document WHERE name = ? LIMIT 1`, [this.name]);
            if (!row.length) {
                throw new Error('No document found');
            }
            return row[Document.DB_COLUMNS.TITLE];
        } catch (error) {
            console.error('Error retrieving title:', error);
            throw error;
        }
    }

    async getContent() {
        try {
            const db = await Database.getInstance();
            const row = await db.query(`SELECT * FROM document WHERE name = ? LIMIT 1`, [this.name]);
            if (!row.length) {
                throw new Error('No document found');
            }
            return row[Document.DB_COLUMNS.CONTENT];
        } catch (error) {
            console.error('Error retrieving content:', error);
            throw error;
        }
    }


    // Restituisce i documenti di un singolo utente
    static async getAllDocuments() {
        try {
            const db = await Database.getInstance();
            const rows = await db.query(`SELECT * FROM document`);
            // Supponiamo che 'user' sia passato come parametro in qualche modo
            return rows.map(row => {
                const user = {
                    // Crea un oggetto utente minimale con il suo USER_ID
                    id: row[Document.DB_COLUMNS.USER_ID] };
                    return new Document(row[Document.DB_COLUMNS.TITLE], user);
                });
        } catch (error) {
            console.error('Error retrieving documents:', error);
            throw error;
        }
    }

}

class User {
    makeNewDocument(name) {
        return new Document(name, this);
    }

    async getMyDocuments() {
        const allDocuments = await Document.getAllDocuments();
        return allDocuments.filter(doc => doc.user === this).map(doc => doc.getTitle());
    }
}
