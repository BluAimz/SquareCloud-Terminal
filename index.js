const readline = require('readline');
const fs = require("fs")

const API_URL = 'https://api.squarecloud.app/v2/apps';
const API_TOKEN = '';
const BOT_ID = '';

const terminal = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function exibirMenu() {
    console.log('\x1B[96mSelecione uma opção:\x1b[0m');
    console.log('\x1B[96m1. Verificar status da aplicação\x1b[0m');
    console.log('\x1B[96m2. Verificar logs da aplicação\x1b[0m');
    console.log('\x1B[96m3. Iniciar aplicação\x1b[0m');
    console.log('\x1B[96m4. Parar aplicação\x1b[0m');
    console.log('\x1B[96m5. Sair\x1b[0m');

    terminal.question('Opção: ', async (opcao) => {
        switch (opcao) {
            case '1':
                try {
                    const response = await fetch(`${API_URL}/${BOT_ID}/status`, {
                        method: 'GET',
                        headers: {
                            Authorization: API_TOKEN,
                        },
                    });

                    const data = await response.json();
                    const informacoes = { status: data };

                    atualizarInformacoes(informacoes);
                    console.clear();
                    console.log('\x1B[32mStatus da aplicação atualizado em squareinfo.json.\x1b[0m');
                } catch (error) {
                    console.error('\x1B[31mErro ao verificar status:', error.message);
                }
                break;
            case '2':
                try {
                    const response = await fetch(`${API_URL}/${BOT_ID}/status`, {
                        method: 'GET',
                        headers: {
                            Authorization: API_TOKEN,
                        },
                    });

                    const data = await response.json();
                    const informacoes = { logs: data };

                    atualizarInformacoes(informacoes);
                    console.clear();
                    console.log('\x1B[32mLogs da aplicação atualizados em squareinfo.json.\x1b[0m');
                } catch (error) {
                    console.error('\x1B[31mErro ao verificar logs:\x1b[0m', error.message);
                }
                break;
            case '3':
                try {
                    await fetch(`${API_URL}/${BOT_ID}/start`, {
                        method: 'POST',
                        headers: {
                            Authorization: API_TOKEN,
                        },
                    });

                    console.clear();
                    console.log('\x1B[32mAplicação iniciada com sucesso!\x1b[0m');
                } catch (error) {
                    console.error('\x1B[31mErro ao iniciar aplicação:\x1b[0m', error.message);
                }
                break;
            case '4':
                try {
                    await fetch(`${API_URL}/${BOT_ID}/stop`, {
                        method: 'POST',
                        headers: {
                            Authorization: API_TOKEN,
                        },
                    });

                    console.clear();
                    console.log('\x1B[32mAplicação parada com sucesso!\x1b[0m');
                } catch (error) {
                    console.error('\x1B[31mErro ao parar aplicação:\x1b[0m', error.message);
                }
                break;
            case '5':
                terminal.close();
                return;
            default:
                console.log('\x1B[31mOpção inválida!\x1b[0m');
        }

        console.log();
        setTimeout(() => {
            exibirMenu();
        }, 250);
    });
}

function atualizarInformacoes(informacoes) {
    const nomeArquivo = 'squareinfo.json';

    let conteudoArquivo = {};
    if (fs.existsSync(nomeArquivo)) {
        const arquivoExistente = fs.readFileSync(nomeArquivo, 'utf8');
        conteudoArquivo = JSON.parse(arquivoExistente);
    }

    const novoConteudo = { ...conteudoArquivo, ...informacoes };

    fs.writeFileSync(nomeArquivo, JSON.stringify(novoConteudo, null, 2), 'utf8');
}

exibirMenu();