import express from 'express';
import { write } from 'fs';
import { readFile, writeFile } from 'fs/promises';

const dataSource = './data/list.txt';

const router = express.Router();

router.post('/contato', async (req, res) => {
    const { name } = req.body;

    if(!name || name.length < 2) {
       return res.json({ error: 'Nome precisa ter pelo menos 2 caracteres.' });
    }

    //processamento dos dados
    let list: string[] = [];
    try {
        const data = await readFile(dataSource, { encoding: 'utf-8' });
        list = data.split('\n');
    }catch(err) { 
        //lista vazia 
    }

    list.push(name);
    
    await writeFile(dataSource, list.join('\n'));

    res.status(201).json({ contato: name });
});

router.get('/contatos', async (req, res) => {
    //processamento dos dados
    let list: string[] = [];
    try {
        const data = await readFile(dataSource, { encoding: 'utf-8' });
        list = data.split('\n');
    }catch(err) { 
        //lista vazia 
    }

    res.json({ contatos: list });
});

router.delete('/contato', async (req, res) => {
    const { name } = req.query;

    if(!name){
        return res.json({ error: 'Nome é obrigatório fioti.' });
    }

    let list: string[] = [];

    try {
        const data = await readFile(dataSource, { encoding: 'utf-8' });
        list = data.split('\n');
    }catch(err) { }

    list = list.filter(item => item.toLowerCase() !== (name as string).toLowerCase());

    // list = list.filter(item => {

    //     // if(item !== name) {
    //     //     return true;
    //     // } else {
    //     //     return false;
    //     // } tem jeito mais facil

    //     return (item !== name);
    // }) tem jeito mais facil

    await writeFile(dataSource, list.join('\n'));

    res.json({ contato: name });

});

export default router;
