import { CarrierDocument, HomologationTask } from '../types';

export const initialTasks: HomologationTask[] = [
  {
    id: '4', clientName: 'Minerva Foods', status: 'In Progress', deadline: '2026-02-26', followUpDate: '', priority: 'medium', notes: 'Selecionar "Primária (Longo Percurso)" na plataforma.', checklist: [
      {
        id: 'mf-checklist-1',
        title: 'Informações Cadastrais',
        status: 'Done',
        responsible: 'Comercial',
        subtasks: [
          { id: 'mf-s1', title: 'Razão Social', type: 'text', status: 'Done', value: 'RODOVIARIO MORADA DO SOL LTDA (EM RECUPERACAO JUDICIAL)' },
          { id: 'mf-s2', title: 'Número CNPJ', type: 'text', status: 'Done', value: '43.954.460/0001-61' },
          { id: 'mf-s3', title: 'Número CPF', type: 'text', status: 'Done', value: '081.658.798-12' },
          { id: 'mf-s4', title: 'E-mail do responsável pelo Cadastro', type: 'text', status: 'Done', value: 'gustavo.geraldo@morada.com.br' },
          { id: 'mf-s5', title: 'Enquadramento Tributário', type: 'single-select', status: 'Done', value: 'Demais Enquadramentos', options: ['Simples Nacional', 'Lucro Presumido', 'Lucro Real', 'MEI', 'Demais Enquadramentos'] },
          { id: 'mf-s6', title: 'Inscrição Estadual', type: 'text', status: 'Done', value: '181.009.982.111' },
          { id: 'mf-s7', title: 'Representante Legal', type: 'text', status: 'Done', value: 'Renato Sarti Magnani' },
          { id: 'mf-s8', title: 'E-mail do Representante Legal', type: 'text', status: 'Done', value: 'renato.magnani@morada.com.br' },
          { id: 'mf-s9', title: 'Banco (nome)', type: 'text', status: 'Done', value: 'Vortx' },
          { id: 'mf-s10', title: 'Banco (número)', type: 'text', status: 'Done', value: '310' },
          { id: 'mf-s11', title: 'Agência', type: 'text', status: 'Done', value: '0001' },
          { id: 'mf-s12', title: 'Conta Corrente', type: 'text', status: 'Done', value: '00110923-7' },
          { id: 'mf-s13', title: 'Nome do Responsável Operacional', type: 'text', status: 'Done', value: 'Miqueias De Almeida' },
          { id: 'mf-s14', title: 'E-mail do Responsável Operacional', type: 'text', status: 'Done', value: 'miqueias.almeida@morada.com.br' },
          { id: 'mf-s15', title: 'CEP', type: 'text', status: 'Done', value: '14.808-100' },
          { id: 'mf-s16', title: 'Logradouro', type: 'text', status: 'Done', value: 'Avenida Marginal Engenheiro Camilo Dinucci' },
          { id: 'mf-s17', title: 'Número', type: 'text', status: 'Done', value: '2885' },
          { id: 'mf-s18', title: 'Bairro', type: 'text', status: 'Done', value: 'Jardim Arco-Íris' },
          { id: 'mf-s19', title: 'Complemento', type: 'text', status: 'Done', value: 'Sem complemento' },
          { id: 'mf-s20', title: 'País', type: 'text', status: 'Done', value: 'Brasil' },
          { id: 'mf-s21', title: 'Estado', type: 'text', status: 'Done', value: 'SP' },
          { id: 'mf-s22', title: 'Telefone', type: 'text', status: 'Done', value: '(19) 3466-8400' },
          { id: 'mf-s23', title: 'Telefone celular', type: 'text', status: 'Done', value: '(19) 98983-5194' },
          { id: 'mf-s24', title: 'Esse número é também o seu Whatsapp?', type: 'single-select', status: 'Done', value: 'Sim', options: ['Sim', 'Não'] },
          { id: 'mf-s25', title: 'Nome testemunha que assinará o contrato', type: 'text', status: 'Done', value: 'Ricardo Braga Frajuca' },
          { id: 'mf-s26', title: 'Email testemunha', type: 'text', status: 'Done', value: 'ricardo.frajuca@morada.com.br' },
          { id: 'mf-s27', title: 'Telefone testemunha', type: 'text', status: 'Done', value: '(16) 99792-4683' },
          { id: 'mf-s28', title: 'Regime Tributário', type: 'single-select', status: 'Done', value: 'Outros', options: ['Simples Nacional', 'Lucro Presumido', 'Lucro Real', 'Outros'] },
          { id: 'mf-s29', title: 'Alíquota', type: 'number', status: 'Done', value: 0 },
          { id: 'mf-s30', title: 'CNPJ Filial - Belo Horizonte/MG', type: 'text', status: 'Done', value: '43.954.460/0003-23' },
          { id: 'mf-s31', title: 'CNPJ Filial - Cubatão/SP', type: 'text', status: 'Done', value: '43.954.460/0004-04' },
          { id: 'mf-s32', title: 'CNPJ Filial - Americana/SP', type: 'text', status: 'Done', value: '43.954.460/0011-33' },
          { id: 'mf-s33', title: 'CNPJ Filial - Sarandi/PR', type: 'text', status: 'Done', value: '43.954.460/0013-03' },
          { id: 'mf-s34', title: 'CNPJ Filial - Cachoeira Alta/GO', type: 'text', status: 'Done', value: '43.954.460/0022-96' },
          { id: 'mf-s35', title: 'CNPJ Filial - Campo Grande/MS', type: 'text', status: 'Done', value: '43.954.460/0023-77' },
          { id: 'mf-s36', title: 'CNPJ Filial - Iracemápolis/SP', type: 'text', status: 'Done', value: '43.954.460/0024-58' },
          { id: 'mf-s37', title: 'CNPJ Filial - Rio de Janeiro/RJ', type: 'text', status: 'Done', value: '43.954.460/0025-39' },
          { id: 'mf-s38', title: 'CNPJ Filial - Cuiabá/MT', type: 'text', status: 'Done', value: '43.954.460/0026-10' },
          { id: 'mf-s39', title: 'CNPJ Filial - Salvador/BA', type: 'text', status: 'Done', value: '43.954.460/0027-09' },
          { id: 'mf-s40', title: 'Pessoa de contato Minerva (quem solicitou o seu cadastro)', type: 'text', status: 'Done', value: 'Thales Hernani dos Santos Ferreira' },
          { id: 'mf-s41', title: 'Observações do Transportador', type: 'text', status: 'Done', value: 'Sem observações.' },
        ]
      },
      {
        id: 'mf-checklist-2',
        title: 'Anexos',
        status: 'WaitingOtherSector',
        responsible: 'Comercial',
        subtasks: [
          { id: 'mf-a1', title: 'Cartão CNPJ', type: 'attachment', status: 'Done', value: 'https://grupomorada-my.sharepoint.com/:b:/g/personal/gustavo_geraldo_grupomorada_com_br/IQCXjoc-8dC4TIa6ImtP_pAwAVpQZggAEALNLbLnPaj5a3c' },
          { id: 'mf-a2', title: 'Cartão Inscrição Estadual', type: 'attachment', status: 'Done', value: 'https://grupomorada-my.sharepoint.com/:b:/g/personal/gustavo_geraldo_grupomorada_com_br/IQC5vlX6zpCoTKM3K3YBfHrhAU32x7_w__ko4-fSEDRTsyA?e=FshQnf' },
          { id: 'mf-a3', title: 'Comprovante Bancário', type: 'attachment', status: 'Done', value: 'https://grupomorada-my.sharepoint.com/:b:/g/personal/gustavo_geraldo_grupomorada_com_br/IQBE_KYCxtfdQJxs99Um1P3qAdJYM2uqwwG8h8oUOS45SQ0' },
          { id: 'mf-a4', title: 'Contrato Social', type: 'attachment', status: 'Done', value: 'https://grupomorada-my.sharepoint.com/:b:/g/personal/gustavo_geraldo_grupomorada_com_br/IQD61lcYaG5oSawOOlrKGJDfAV3SdHYUbGj1NYrN-8NGpqw' },
          { id: 'mf-a5', title: 'Certificado ANTT', type: 'attachment', status: 'Done', value: 'https://grupomorada-my.sharepoint.com/:b:/g/personal/gustavo_geraldo_grupomorada_com_br/IQDUQsX43qVEQZ_hCHvRyJT6ARqmqDZFXZzteHiAKDnfsEg' },
          { id: 'mf-a6', title: 'Termo de compromisso preenchido', type: 'attachment', status: 'WaitingOtherSector', value: '' },
          { id: 'mf-a7', title: 'Comprovante de treinamento preenchido', type: 'attachment', status: 'WaitingOtherSector', value: '' },
        ]
      },
      {
        id: 'mf-checklist-3',
        title: 'Informações OpenTech',
        status: 'Done',
        responsible: 'Comercial',
        subtasks: [
          { id: 'mf-ot1', title: 'E-mail Financeiro', type: 'text', status: 'Done', value: 'financeiro@morada.com.br' },
          { id: 'mf-ot2', title: 'Telefone Financeiro', type: 'text', status: 'Done', value: '(16) 99735-9004' },
        ]
      },
      {
        id: 'mf-checklist-4',
        title: 'Informações Multiembarcador',
        status: 'Done',
        responsible: 'Comercial',
        subtasks: [
          { id: 'mf-me1', title: 'Número da ANTT', type: 'text', status: 'Done', value: '000285214' },
          { id: 'mf-me2', title: 'E-mail para envio dos Cte\'s', type: 'text', status: 'Done', value: 'cte@morada.com.br' },
          { id: 'mf-me3', title: 'Certificado Digital Modelo A1', type: 'attachment', status: 'Done', value: 'https://grupomorada-my.sharepoint.com/:u:/g/personal/gustavo_geraldo_grupomorada_com_br/IQD3Msf6hLtjQ4ZXL3w6uktGAQCJ8P9lWzGJLHi6bqycLOg?e=HEQK67' },
          { id: 'mf-me4', title: 'Senha de acesso do Certificado', type: 'text', status: 'Done', value: 'Morada@01' },
          { id: 'mf-me5', title: 'Simples Nacional', type: 'single-select', status: 'Done', value: 'Não', options: ['Sim', 'Não'] },
          { id: 'mf-me6', title: 'Nome do Contador', type: 'text', status: 'Done', value: 'Carlos Antonio De Oliveira' },
          { id: 'mf-me7', title: 'Telefone do Contador', type: 'text', status: 'Done', value: '(16) 99182-6289' },
          { id: 'mf-me8', title: 'E-mail do Contador', type: 'text', status: 'Done', value: 'carlos.oliveira@morada.com.br' },
        ]
      }
    ], history: [], contactName: 'Thales Hernani dos Santos Ferreira', contactEmail: 'thales.ferreira@minervafoods.com', contactPhone: '(17) 98183-6630', contactIsWhatsApp: true, contactLink: 'https://fluig.minervafoods.com:10000/portal/MINERVA/cadastroTransportador', empresa: 'Morada', filial: 'Araraquara (Matriz)'
  },
  {
    id: '7', clientName: 'Vibra', status: 'Waiting on Client', deadline: '2026-02-27', followUpDate: '', priority: 'medium', notes: 'Entrar em contato por telefone', checklist: [
      {
        id: 'vb-checklist-1',
        title: 'Pendências',
        status: 'NotStarted',
        responsible: 'Comercial',
        subtasks: [
          { id: 'vb-s1', title: 'Solicitar a Vibra Energia cadastro do meu usuário para visualização de toda pendência documental no cadastro de todas unidades da Morada.', type: 'checkbox', status: 'NotStarted', value: false },
        ]
      }
    ], history: [], contactName: '-', contactEmail: '-', contactPhone: '(21) 2566-2100', contactIsWhatsApp: false, contactLink: 'https://cn.vibraenergia.com.br/', empresa: 'Morada', filial: ''
  },
  {
    id: '8', clientName: 'Grupo Petropolis', status: 'Waiting on Client', deadline: '2026-02-27', followUpDate: '', priority: 'medium', notes: 'Preenchimento RFI\n\n#Contato 02:\nNome: Airton Rocha\nE-mail: acrocha@grupopetropolis.com.br\nTelefone: (15) 99101-1375', checklist: [
      {
        id: 'gp-checklist-2',
        title: 'Preenchimento RFI',
        status: 'NotStarted',
        responsible: 'Comercial',
        subtasks: [
          { id: 'gp-r1', title: 'Preencher RFI conforme planilha', type: 'checkbox', status: 'NotStarted', value: false },
        ]
      }
    ], history: [], contactName: 'Evelyn Souza', contactEmail: 'evsouza@grupopetropolis.com.br', contactPhone: '-', contactIsWhatsApp: false, contactLink: 'https://grupomorada-my.sharepoint.com/:x:/g/personal/gustavo_geraldo_grupomorada_com_br/IQDQuEJnTzQYSpC-jrxg0COsAdZd9gQdfZcag7zh0xuLn54?e=gxAKOz', empresa: 'Morada', filial: ''
  },
  { id: '9', clientName: 'Royal Fic Combustível', status: 'Not Started', deadline: '', followUpDate: '', priority: 'medium', notes: '', checklist: [], history: [], contactName: '', contactEmail: '', contactPhone: '', contactIsWhatsApp: false, contactLink: '', empresa: '', filial: '' },
  { id: '10', clientName: 'Inpasa', status: 'Not Started', deadline: '', followUpDate: '', priority: 'medium', notes: '', checklist: [], history: [], contactName: '', contactEmail: '', contactPhone: '', contactIsWhatsApp: false, contactLink: '', empresa: '', filial: '' },
  { id: '11', clientName: 'Fs Bioenergia', status: 'Not Started', deadline: '', followUpDate: '', priority: 'medium', notes: '', checklist: [], history: [], contactName: '', contactEmail: '', contactPhone: '', contactIsWhatsApp: false, contactLink: '', empresa: '', filial: '' },
  { id: '12', clientName: 'Raízen', status: 'Not Started', deadline: '', followUpDate: '', priority: 'medium', notes: '', checklist: [], history: [], contactName: '', contactEmail: '', contactPhone: '', contactIsWhatsApp: false, contactLink: '', empresa: '', filial: '' },
  { id: '13', clientName: 'Evonik', status: 'Not Started', deadline: '', followUpDate: '', priority: 'medium', notes: '', checklist: [], history: [], contactName: '', contactEmail: '', contactPhone: '', contactIsWhatsApp: false, contactLink: '', empresa: '', filial: '' },
  { id: '14', clientName: 'Novelis', status: 'Not Started', deadline: '', followUpDate: '', priority: 'medium', notes: '', checklist: [], history: [], contactName: '', contactEmail: '', contactPhone: '', contactIsWhatsApp: false, contactLink: '', empresa: '', filial: '' },
  { id: '15', clientName: 'Valgroup', status: 'Not Started', deadline: '', followUpDate: '', priority: 'medium', notes: '', checklist: [], history: [], contactName: '', contactEmail: '', contactPhone: '', contactIsWhatsApp: false, contactLink: '', empresa: '', filial: '' },
  { id: '16', clientName: 'Go Flux', status: 'Not Started', deadline: '', followUpDate: '', priority: 'medium', notes: '', checklist: [], history: [], contactName: '', contactEmail: '', contactPhone: '', contactIsWhatsApp: false, contactLink: '', empresa: '', filial: '' },
  { id: '17', clientName: 'Pão De Açucar', status: 'Not Started', deadline: '', followUpDate: '', priority: 'medium', notes: '', checklist: [], history: [], contactName: '', contactEmail: '', contactPhone: '', contactIsWhatsApp: false, contactLink: '', empresa: '', filial: '' },
  { id: '18', clientName: 'Permetal', status: 'Not Started', deadline: '', followUpDate: '', priority: 'medium', notes: '', checklist: [], history: [], contactName: '', contactEmail: '', contactPhone: '', contactIsWhatsApp: false, contactLink: '', empresa: '', filial: '' },
  { id: '19', clientName: 'Santa Helena', status: 'Not Started', deadline: '', followUpDate: '', priority: 'medium', notes: '', checklist: [], history: [], contactName: '', contactEmail: '', contactPhone: '', contactIsWhatsApp: false, contactLink: '', empresa: '', filial: '' },
  { id: '20', clientName: 'Gomes De Carvalho', status: 'Not Started', deadline: '', followUpDate: '', priority: 'medium', notes: '', checklist: [], history: [], contactName: '', contactEmail: '', contactPhone: '', contactIsWhatsApp: false, contactLink: '', empresa: '', filial: '' },
  { id: '21', clientName: 'Ambev', status: 'Not Started', deadline: '', followUpDate: '', priority: 'medium', notes: '', checklist: [], history: [], contactName: '', contactEmail: '', contactPhone: '', contactIsWhatsApp: false, contactLink: '', empresa: '', filial: '' },
  { id: '22', clientName: 'Agropalma', status: 'Not Started', deadline: '', followUpDate: '', priority: 'medium', notes: '', checklist: [], history: [], contactName: '', contactEmail: '', contactPhone: '', contactIsWhatsApp: false, contactLink: '', empresa: '', filial: '' },
];

export const initialArchivedTasks: HomologationTask[] = [
  { id: '1', clientName: 'Heineken', status: 'Approved', deadline: '', followUpDate: '', priority: 'medium', notes: '', checklist: [], history: [], contactName: '', contactEmail: '', contactPhone: '', contactIsWhatsApp: false, contactLink: '', empresa: '', filial: '' },
  { id: '2', clientName: 'Atvos Energia', status: 'Approved', deadline: '', followUpDate: '', priority: 'medium', notes: '', checklist: [], history: [], contactName: '', contactEmail: '', contactPhone: '', contactIsWhatsApp: false, contactLink: '', empresa: '', filial: '' },
  { id: '3', clientName: 'Logshare', status: 'Approved', deadline: '', followUpDate: '', priority: 'medium', notes: '', checklist: [], history: [], contactName: '', contactEmail: '', contactPhone: '', contactIsWhatsApp: false, contactLink: '', empresa: '', filial: '' },
  { id: '5', clientName: 'Mercado Livre', status: 'Approved', deadline: '', followUpDate: '', priority: 'medium', notes: '', checklist: [], history: [], contactName: '', contactEmail: '', contactPhone: '', contactIsWhatsApp: false, contactLink: '', empresa: '', filial: '' },
  { id: '6', clientName: 'Flora Produtos De Higiene E Limpeza S/A', status: 'Approved', deadline: '', followUpDate: '', priority: 'medium', notes: '', checklist: [], history: [], contactName: '', contactEmail: '', contactPhone: '', contactIsWhatsApp: false, contactLink: '', empresa: '', filial: '' },
];

export const initialDocuments: CarrierDocument[] = [
  {
    id: 'd1',
    name: 'Contrato Social Consolidado',
    category: 'Societário',
    expirationDate: '',
    status: 'Valid',
    notes: 'Última alteração contratual registrada em 2023.'
  },
  {
    id: 'd2',
    name: 'Certidão Negativa de Débitos Federais',
    category: 'Fiscal',
    expirationDate: '2026-08-15',
    status: 'Valid',
    notes: 'Emitida via site da Receita Federal.'
  },
  {
    id: 'd3',
    name: 'Certificado RNTRC (ANTT)',
    category: 'Operacional',
    expirationDate: '2026-01-10',
    status: 'Expired',
    notes: 'Necessário renovar com urgência. Processo já iniciado no Sindicato.'
  },
  {
    id: 'd4',
    name: 'Apólice RCTR-C',
    category: 'Seguros',
    expirationDate: '2026-12-31',
    status: 'Valid',
    notes: 'Seguradora Porto Seguro. Limite de R$ 500.000,00 por embarque.'
  }
];
