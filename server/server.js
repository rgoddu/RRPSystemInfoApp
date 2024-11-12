
import express from 'express';
import os from 'os';
import path from 'path';

import { getTemperature } from './helperFunction/GetCpuTemp.js';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static('../frontend'));

app.get('/system-info', (req, res) => {
    res.sendFile(path.join(path.resolve(), '../frontend', 'index.html'));
})

app.get('/api/system-info', async (req, res) => {
    try{
        const temperature = await getTemperature();
        const systemInfo = {
            hostname: os.hostname(),
            platform: os.platform(),
            architecture: os.arch(),
            cpu: os.cpus(),
            memory: {
                total: os.totalmem(),
                free: os.freemem(),
                used: os.totalmem() - os.freemem()
            },
            temperature: temperature
        };
        res.json(systemInfo);
    }catch(err){
        console.error(err)
        res.status(500).json({error: 'Failed to retrieve system information'})
    }
});


app.listen( PORT , '0.0.0.0', () => {
    console.log(`server is listening on port http://localhost:${PORT}`, )
})