const { request } = require("express");
const express = require("express");
const { v4: uuidv4 } = require('uuid') // :uuidv4 foi feita somente para poder renomear o v4.
// A biblioteca uuid tem algumas versões, a versão que estamos utilizando é a v4 
// e ela gera números completamente aleatórios e não baseado no timestamp como em outra versão.

const app = express();

// O express não trabalha somente com JSON então precisamos informar para o express
// que o tipo de parâmetro que vamos receber dentro do nosso body pode ser do
// tipo JSON. Informamos isso da seguinte forma:
app.use(express.json());

const customers = [];

function verifyIfExistsAccountCPF(req, resp, next){
    const { cpf } = req.headers;
    
    const customer = customers.find((customer) => customer.cpf === cpf);
    
    if(!customer){
        return resp.status(400).json({ error: "Customer not found." })
    }

    req.customer = customer;

    return next();
}

function getBalance(statement){
    const balance = statement.reduce((acc, operation) => {
        if(operation.type === "credit"){
            return acc + operation.amount;
        }else {
            return acc - operation.amount;
        }
    }, 0);

    return balance;
}

app.post('/account', (req, resp) => {
    const { cpf, name } = req.body;

    customersAlreadyExists = customers.some((customers) => customers.cpf === cpf)

    if(customersAlreadyExists){
        return resp.status(400).json({ error: "Customer already exists." });
    }

    customers.push({
        cpf,
        name,
        id: uuidv4(),
        statement: []
    });

    return resp.status(201).send() // O código http 201 é usado para quando algo é criado.
})

app.get('/statement', verifyIfExistsAccountCPF, (req, resp) => {

    const { customer } = req;

    return resp.status(200).json(customer.statement);
})

app.post('/deposit', verifyIfExistsAccountCPF, (req, resp) => {
    const { description, amount } = req.body;

    const { customer } = req;

    const statementOperation = {
        description,
        amount,
        created_at: new Date(),
        type: "credit"
    }

    customer.statement.push(statementOperation);

    return resp.status(201).send();
})

app.post('/withdraw', verifyIfExistsAccountCPF, (req, resp) => {
    const { amount } = req.body;
    const { customer } = req;

    const balance = getBalance(customer.statement);

    console.log('eita 1', balance)
    console.log('eita 2', amount)

    if(balance < amount){
        return resp.status(400).json({ error: "Insufficient funds!"});
    }

    const statementOperation = {
        amount,
        created_at: new Date(),
        type: "debit"
    }

    customer.statement.push(statementOperation);

    return resp.status(201).send();
})

app.get('/statement/date', verifyIfExistsAccountCPF, (req, resp) => {

    const { customer } = req;
    const { date } = req.query;

    const dateFormat = new Date(date + " 00:00");

    const statement = customer.statement.filter((statement) => {
        return statement.created_at.toDateString() === new Date(dateFormat).toDateString();
    })

    return resp.status(200).json(statement);
})

app.put('/account', verifyIfExistsAccountCPF, (req, resp) => {
    const { customer } = req;
    const { name } = req.body;  

    customer.name = name; 

    return resp.status(201).send();
})

app.get('/account', verifyIfExistsAccountCPF, (req, resp) => {
    const { customer } = req;

    return resp.status(200).json(customer);
})

app.delete('/account', verifyIfExistsAccountCPF, (req, resp) => {
    const { customer } = req;

    customers.splice(customer, 1);

    return resp.status(200).json(customers);
})

app.get('/balance', verifyIfExistsAccountCPF, (req, resp) => {
    const { customer } = req;

    const balance = getBalance(customer.statement)

    return resp.status(200).json(balance);
})

app.listen("3333", () => console.log('Server is running!'));