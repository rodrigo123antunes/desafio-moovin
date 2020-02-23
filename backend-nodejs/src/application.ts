import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as store from 'store'
import * as cors from 'cors'
import * as dotenv from 'dotenv'
dotenv.config()

const application = express()

application.use(bodyParser.text())
application.use(express.json())
application.use(express.urlencoded({ extended: false }))
application.use(cors())

application.get('/bank', async (req, res) => {
    let response = {};
    try {
        const {operation_type, number_account, value, account_type} = req.query;

        if (!operation_type) {
            console.error('Favor informar o campo operation_type(deposito ou saque).');
            return res.status(406).json({'error': 'Favor informar o campo operation_type(deposito ou saque).'});
        } else if (!value) {
            console.error('Favor informar o campo value.');
            return res.status(406).json({'error': 'Favor informar o campo value.'});
        } else if (!account_type) {
            console.error('Favor informar o campo account_type.');
            return res.status(406).json({'error': 'Favor informar o campo account_type.'});
        } else if (operation_type === 'deposito') {
            if (!number_account) {
                console.error('Favor informar o campo number_account.');
                return res.status(406).json({'error': 'Favor informar number_account.'});
            }
        }

        let current_balance = 500;
        let savings_balance = 1000; //Poupança
        const savingsStore = store.get("savings_balance");
        const balanceStore = store.get("current_balance");

        if (savingsStore) {
            savings_balance = savingsStore;
        }

        if (balanceStore) {
            current_balance = balanceStore;
        }

        const account = 5506873818514372;

        if (account != number_account) {
            console.error('Número da conta não encontrada. Use 5506873818514372');
            return res.status(406).json({'error': 'Número da conta não encontrada. Use 5506873818514372.'});
        }

        if (value > 600) {
            console.error('Você não pode sacar mais que B$ 600,00.');
            return res.status(406).json({'error': 'Você não pode sacar mais que B$ 600,00.'});
        }

        if (operation_type === 'saque') {
            if (account_type === 'poupança') {
                if (value <= (savings_balance - 0.30)) {
                    const newBalance = (savings_balance - value) - 0.30;

                    store.set("savings_balance", newBalance);
                } else {
                    console.error('Você não possui saldo suficiente.');
                    return res.status(406).json({'error': 'Você não possui saldo suficiente.'});
                }

                response = {"Extrato": {
                    "Saldo atual": `B$ ${store.get("savings_balance")}`,
                    "Valor": `B$ ${value},00`,
                    "desconntos": 'B$ 0.30',
                }};
            } else if (account_type === 'corrente') {
                if (value <= (current_balance - 0.30)) {
                    const newBalance = (current_balance - value) - 0.30;

                    store.set("current_balance", newBalance);
                } else {
                    console.error('Você não possui saldo suficiente.');
                    return res.status(406).json({'error': 'Você não possui saldo suficiente.'});
                }

                response = {"Extrato": {
                    "Saldo atual": `B$ ${store.get("current_balance")}`,
                    "Valor": `B$ ${value},00`,
                    "desconntos": 'B$ 0.30',
                }};
            }
        } else {
            const newBalance = current_balance + parseInt(value, 10);
            store.set("current_balance", newBalance);

            response = {"Extrato": {
                "Saldo atual": `B$ ${store.get("current_balance")}`,
                "Valor": `B$ ${value},00`,
            }};
        }

    } catch (err) {
        console.log(err);
    }

    return res.json(response);
});

application.set('port', process.env.APP_PORT || 5000)

export { application }