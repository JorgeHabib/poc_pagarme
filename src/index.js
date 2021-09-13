const express = require('express');
const pagarme = require('pagarme');

const API_KEY = 'ak_test_1A6uDGdPpCqu3GYhiCEpYZFU5Z4Jzj';
const CRIPTO = 'ek_test_O99coNIG8hTGOCgSzoHhouDbx8qrD1';

const MY_BANK_ACCOUNT = 're_cks82xxi608ar0o9ts6qzspvw';

const app = express();

app.post('/saldo-receber', async (req, res) => {
  const client = await pagarme.client.connect({ api_key: API_KEY });
  const balance = await client.balance.find({
    recipientId: MY_BANK_ACCOUNT,
  });

  return res.json({ ...balance });
})

app.post('/generate-token', async (req, res) => {
  const card = {
    card_number: "4111111111111111",
    card_cvv: "123",
    card_expiration_date: "0922",
    card_holder_name: "Morpheus Fishburne",
  }

  const client_hash = await pagarme.client.connect({ encryption_key: CRIPTO });
  const card_hash = await client_hash.security.encrypt(card);

  return res.json({ card_hash })
})

app.post('/bank-accounts', async (req, res) => {
  const client = await pagarme.client.connect({ api_key: API_KEY });
  const bankAccounts = await client.bankAccounts.all();

  return res.json({ ...bankAccounts });
});

app.post('/cartao-installments-split', async (req, res) => {
  const card = {
    card_number: "4111111111111111",
    card_cvv: "123",
    card_expiration_date: "0922",
    card_holder_name: "Morpheus Fishburne",
  }

  const client_hash = await pagarme.client.connect({ encryption_key: CRIPTO });
  const card_hash = await client_hash.security.encrypt(card);

  console.log(card_hash)

  const client_api = await pagarme.client.connect({ api_key: API_KEY })
  const transaction = await client_api.transactions.create({
    amount: 26040,
    installments: 12,
    card_hash,
    customer: {
      external_id: "#3311",
      name: "Morpheus Fishburne",
      type: "individual",
      country: "br",
      email: "mopheus@nabucodonozor.com",
      documents: [
        {
          type: "cpf",
          number: "30621143049"
        }
      ],
      phone_numbers: ["+5511999998888"],
      birthday: "1965-01-01"
    },
    billing: {
      name: "Trinity Moss",
      address: {
        country: "br",
        state: "sp",
        city: "Cotia",
        neighborhood: "Rio Cotia",
        street: "Rua Matrix",
        street_number: "9999",
        zipcode: "06714360"
      }
    },
    items: [
      {
        id: "r123",
        title: "Red pill",
        unit_price: 10000,
        quantity: 1,
        tangible: true
      },
      {
        id: "b123",
        title: "Blue pill",
        unit_price: 10000,
        quantity: 1,
        tangible: true
      }
    ],
    split_rules: [
      {
        recipient_id: MY_BANK_ACCOUNT,
        percentage: 50,
        liable: true,
        charge_processing_fee: true
      },
      {
        recipient_id: "re_cksarqku009400i9t1z4e4u67",
        percentage: 50,
        liable: false,
        charge_processing_fee: false
      }
    ]
  });

  return res.json({ card_hash, ...transaction });
});

app.post('/cartao-split', async (req, res) => {
  const card = {
    card_number: "4111111111111111",
    card_cvv: "123",
    card_expiration_date: "0922",
    card_holder_name: "Morpheus Fishburne",
  }

  const client_hash = await pagarme.client.connect({ encryption_key: CRIPTO });
  const card_hash = await client_hash.security.encrypt(card);

  console.log(card_hash)

  const client_api = await pagarme.client.connect({ api_key: API_KEY })
  const transaction = await client_api.transactions.create({
    amount: 21000,
    card_hash,
    customer: {
      external_id: "#3311",
      name: "Morpheus Fishburne",
      type: "individual",
      country: "br",
      email: "mopheus@nabucodonozor.com",
      documents: [
        {
          type: "cpf",
          number: "30621143049"
        }
      ],
      phone_numbers: ["+5511999998888"],
      birthday: "1965-01-01"
    },
    billing: {
      name: "Trinity Moss",
      address: {
        country: "br",
        state: "sp",
        city: "Cotia",
        neighborhood: "Rio Cotia",
        street: "Rua Matrix",
        street_number: "9999",
        zipcode: "06714360"
      }
    },
    items: [
      {
        id: "r123",
        title: "Red pill",
        unit_price: 10000,
        quantity: 1,
        tangible: true
      },
      {
        id: "b123",
        title: "Blue pill",
        unit_price: 10000,
        quantity: 1,
        tangible: true
      }
    ],
    split_rules: [
      {
        recipient_id: MY_BANK_ACCOUNT,
        percentage: 50,
        liable: true,
        charge_processing_fee: true
      },
      {
        recipient_id: "re_cksarqku009400i9t1z4e4u67",
        percentage: 50,
        liable: false,
        charge_processing_fee: false
      }
    ]
  });

  return res.json({ card_hash, ...transaction });
});

app.post('/installments', async (req, res) => {
  const client = await pagarme.client.connect({ api_key: API_KEY });

  const installments = await client.transactions.calculateInstallmentsAmount({
    id: 1234,
    max_installments: 12,
    free_installments: 1,
    interest_rate: 2,
    amount: 21000
  });

  return res.json({ ...installments });
});

app.get('/recipient', async (req, res) => {
  const client = await pagarme.client.connect({ api_key: API_KEY });
  const recipients = await client.recipients.find({ id: 're_ckskdwr4q02ye0o9to4og0ncr' });

  return res.json({ ...recipients });
})

app.post('/create-recipient', async (req, res) => {
  const client = await pagarme.client.connect({ api_key: API_KEY })

  const bankAccount = await client.recipients.create({
    transfer_enabled: false,
    transfer_interval: "weekly",
    transfer_day: 5,
    automatic_anticipation_enabled: true,
    anticipatable_volume_percentage: 85,
    bank_account_id: 18870621,
  });

  return res.json({ ...bankAccount });
})

app.post('/create-bank-account', async (req, res) => {
  const client = await pagarme.client.connect({ api_key: API_KEY })

  const bankAccount = await client.bankAccounts.create({
    bank_code: '237',
    agencia: '1935',
    agencia_dv: '9',
    conta: '23398',
    conta_dv: '9',
    legal_name: 'API BANK ACCOUNT',
    document_number: '26268738888'
  });

  return res.json({ ...bankAccount });
})

app.post('/refund/:id/:amount', async (req, res) => {
  const { id, amount } = req.params;

  const client = await pagarme.client.connect({ api_key: API_KEY })
  const transaction = await client.transactions.find({ id })
    
  await client.transactions.refund({
      id: transaction.id,
      amount,
  });

  return res.json({ ...transaction });
})

app.post('/update-transaction/:id', async (req, res) => {
    const { id } = req.params;

    const client = await pagarme.client.connect({ api_key: API_KEY })
    const transaction = await client.transactions.find({ id })
      
    await client.transactions.update({
        id: transaction.id,
        status: 'paid',
    });

    return res.json({ updated: true });
})

app.get('/transaction/:id', async (req, res) => {
    const { id } = req.params;

    const client = await pagarme.client.connect({ api_key: API_KEY });
    const transaction = await client.transactions.find({
        id 
    });

    return res.json({ transaction });
})

app.post('/boleto', async (req, res) => {
    const client = await pagarme.client.connect({ api_key: API_KEY }); 
    const transaction = await client.transactions.create({
        amount: 1000,
        payment_method: 'boleto',
        postback_url: 'https://webhook.site/682223e0-9c3f-42cb-98e7-fe02f14efbaf',
        customer: {
            type: 'individual',
            country: 'br',
            name: 'Aardvark Silva',
            documents: [
            {
                type: 'cpf',
                number: '04433072966',
            },
            ],
        },
    })

    return res.json({ ...transaction });
})

app.post('/cartao-installments', async (req, res) => {
  const card = {
    card_number: "4111111111111111",
    card_cvv: "123",
    card_expiration_date: "0922",
    card_holder_name: "Morpheus Fishburne",
  }

  const client_hash = await pagarme.client.connect({ encryption_key: CRIPTO });
  const card_hash = await client_hash.security.encrypt(card);

  console.log(card_hash)

  const client_api = await pagarme.client.connect({ api_key: API_KEY })
  const transaction = await client_api.transactions.create({
    amount: 26040,
    installments: 12,
    card_hash,
    customer: {
      external_id: "#3311",
      name: "Morpheus Fishburne",
      type: "individual",
      country: "br",
      email: "mopheus@nabucodonozor.com",
      documents: [
        {
          type: "cpf",
          number: "30621143049"
        }
      ],
      phone_numbers: ["+5511999998888"],
      birthday: "1965-01-01"
    },
    billing: {
      name: "Trinity Moss",
      address: {
        country: "br",
        state: "sp",
        city: "Cotia",
        neighborhood: "Rio Cotia",
        street: "Rua Matrix",
        street_number: "9999",
        zipcode: "06714360"
      }
    },
    items: [
      {
        id: "r123",
        title: "Red pill",
        unit_price: 10000,
        quantity: 1,
        tangible: true
      },
      {
        id: "b123",
        title: "Blue pill",
        unit_price: 10000,
        quantity: 1,
        tangible: true
      }
    ]
  });

  return res.json({ card_hash, ...transaction });
});

app.post('/cartao', async (req, res) => {
    // pagarme_connection.transactions.create({
    //     amount: 1000,
    //     card_number: '4111111111111111',
    //     card_holder_name: 'abc',
    //     card_expiration_date: '1225',
    //     card_cvv: '123',
    // });

    const card = {
      card_number: "4111111111111111",
      card_cvv: "123",
      card_expiration_date: "0922",
      card_holder_name: "Morpheus Fishburne",
    }

    const client_hash = await pagarme.client.connect({ encryption_key: CRIPTO });
    const card_hash = await client_hash.security.encrypt(card);

    console.log(card_hash)

    const client_api = await pagarme.client.connect({ api_key: API_KEY })
    const transaction = await client_api.transactions.create({
      amount: 1960,
      card_hash,
      customer: {
        external_id: "#3311",
        name: "Morpheus Fishburne",
        type: "individual",
        country: "br",
        email: "mopheus@nabucodonozor.com",
        documents: [
          {
            type: "cpf",
            number: "30621143049"
          }
        ],
        phone_numbers: ["+5511999998888"],
        birthday: "1965-01-01"
      },
      billing: {
        name: "Trinity Moss",
        address: {
          country: "br",
          state: "sp",
          city: "Cotia",
          neighborhood: "Rio Cotia",
          street: "Rua Matrix",
          street_number: "9999",
          zipcode: "06714360"
        }
      },
      items: [
        {
          id: "r123",
          title: "Red pill",
          unit_price: 10000,
          quantity: 1,
          tangible: true
        },
        {
          id: "b123",
          title: "Blue pill",
          unit_price: 10000,
          quantity: 1,
          tangible: true
        }
      ]
    });

    return res.json({ card_hash, ...transaction });
});

app.listen(3030, () => {
    console.log('App running in port 3030');
})