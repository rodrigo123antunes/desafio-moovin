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
        const {operation_type, number_account, value} = req.query;
        if (!operation_type) {
            console.error('field operation_type cannot be null.');
            return res.status(406).json({'error': 'field operation_type cannot be null.'});
        } else if (!value) {
            console.error('field value cannot be null.');
            return res.status(406).json({'error': 'field value cannot be null.'});
        } else if (operation_type === 'deposito') {
            if (!number_account) {
                console.error('field number_account cannot be null.');
                return res.status(406).json({'error': 'field number_account cannot be null.'});
            }
        }

        let current_balance = 5000;
        const balanceStore = store.get("current_balance");

        if (balanceStore) {
            current_balance = balanceStore;
        }

        console.log("current_balance: ", current_balance);

        const account = 5506873818514372;
        const savings_balance = 1000;

        if (account != number_account) {
            console.error('Number account not exists.');
            return res.status(406).json({'error': 'field operation_type cannot be null.'});
        }

        if (value > 600) {
            console.error('You cannot withdraw more than B$ 600,00.');
            return res.status(406).json({'error': 'You cannot withdraw more than B$ 600,00.'});
        }

        if (operation_type === 'saque') {
            if (value <= (current_balance - 0.30)) {
                const newBalance = (current_balance - value) - 0.30;
                console.log("55555555555555555555555555555555555555555555");
                console.log("55555555555555555555555555555555555555555555");
                console.log(newBalance);

                store.set("current_balance", newBalance);
            }
        } else {
            const newBalance = current_balance + parseInt(value, 10);
            store.set("current_balance", newBalance);
        }

        response = {"Saldo atual": store.get("current_balance")};
    } catch (err) {
        console.log(err);
    }

    return res.json(response);
});

application.set('port', process.env.APP_PORT || 5000)

export { application }