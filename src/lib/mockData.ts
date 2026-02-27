import { CarrierDocument, HomologationTask } from '../types';

export const initialTasks: HomologationTask[] = [
  {
    id: '22',
    clientName: 'Agropalma',
    status: 'Approved',
    deadline: '2026-02-27',
    followUpDate: '',
    priority: 'medium',
    notes: 'Aguardando orientações a respeito do cadastro de informações islâmicas.',
    checklist: [
      {
        id: 'agro-chk-1',
        title: 'Checklist Agropalma',
        status: 'Done',
        responsible: 'Comercial',
        subtasks: [
          { id: 'agro-st1', title: 'Tratativa Inicial', type: 'text', status: 'Done', value: 'Concluído' },
          { id: 'agro-st2', title: 'Orientações Islâmicas', type: 'text', status: 'Done', value: 'Concluído' }
        ]
      }
    ],
    history: [],
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    contactIsWhatsApp: false,
    contactLink: 'https://sesuite.agropalma.com.br/se/v79508/survey/s.php?token=b64177bea871456cf6633911e5e1eac6&se-guestsession-token=6006756f404b74441f496274d7830aec9241',
    empresa: '',
    filial: '',
    completed: true
  },
  { id: '21', clientName: 'Ambev', status: 'Not Started', deadline: '2026-02-27', followUpDate: '', priority: 'medium', notes: '', checklist: [], history: [], contactName: '', contactEmail: '', contactPhone: '', contactIsWhatsApp: false, contactLink: '', empresa: '', filial: '' },
  { id: '2', clientName: 'Atvos Energia', status: 'Approved', deadline: '2026-02-27', followUpDate: '', priority: 'medium', notes: '', checklist: [], history: [], contactName: '', contactEmail: '', contactPhone: '', contactIsWhatsApp: false, contactLink: '', empresa: '', filial: '', completed: true },
  {
    id: '13', clientName: 'Evonik', status: 'In Progress', deadline: '2026-02-27', followUpDate: '', priority: 'medium', notes: '', checklist: [
      {
        id: 'evo-chk-1',
        title: 'Responsável pelo preenchimento da RFI',
        status: 'Done',
        responsible: 'Comercial',
        subtasks: [
          { id: 'evo-r1', title: 'Nome', type: 'text', status: 'Done', value: 'Gustavo Henrique Geraldo' },
          { id: 'evo-r2', title: 'Telefone', type: 'text', status: 'Done', value: '(16) 99115-5946' },
          { id: 'evo-r3', title: 'E-mail', type: 'text', status: 'Done', value: 'gustavo.geraldo@morada.com.br' },
          { id: 'evo-r4', title: 'Departamento', type: 'text', status: 'Done', value: 'Torre de Controle' },
          { id: 'evo-r5', title: 'Data preenchimento', type: 'text', status: 'Done', value: '26/11/2025' }
        ]
      },
      {
        id: 'evo-chk-2',
        title: 'Informações gerais da empresa',
        status: 'Done',
        responsible: 'Comercial',
        subtasks: [
          { id: 'evo-g1', title: 'Razão Social', type: 'text', status: 'Done', value: 'RODOVIARIO MORADA DO SOL LTDA' },
          { id: 'evo-g2', title: 'Nome Fantasia', type: 'text', status: 'Done', value: 'MORADA TRANSPORTES' },
          { id: 'evo-g3', title: 'CNPJ da Matriz', type: 'text', status: 'Done', value: '43.954.460/0001-61' },
          { id: 'evo-g4', title: 'Participação Societária', type: 'text', status: 'Done', value: 'MORADA: 99,97%, RMINVEST: 0,01%, BEC: 0,01%, MTMH: 0,01%' },
          { id: 'evo-g5', title: 'Tempo de Mercado (anos)', type: 'text', status: 'Done', value: '64 anos' },
          { id: 'evo-g6', title: 'Atualmente, é fornecedor da Evonik?', type: 'single-select', status: 'Done', value: 'Não', options: ['Sim', 'Não'] },
          { id: 'evo-g7', title: 'Já foi fornecedor da Evonik?', type: 'text', status: 'Done', value: 'Não evidenciado' },
          { id: 'evo-g8', title: '5 principais clientes (carga geral)', type: 'text', status: 'Done', value: 'Heineken, Raízen, BP Bioenergia, FS Fueling Sustainability e NEXTA Distribuidora' },
          { id: 'evo-g9', title: '5 principais clientes (químico)', type: 'text', status: 'Done', value: 'Heineken, Raízen, BP Bioenergia, FS Fueling Sustainability e NEXTA Distribuidora' },
          { id: 'evo-g10', title: 'Endereço da Matriz', type: 'text', status: 'Done', value: 'Av. Marginal Eng. Camilo Dinucci, 2885, Jd Arco-Íris, Araraquara/SP' },
          { id: 'evo-g11', title: 'Pessoa para contato comercial', type: 'text', status: 'Done', value: 'Ricardo Braga Frajuca (Gerente Comercial)' },
          { id: 'evo-g12', title: 'Telefone Contato', type: 'text', status: 'Done', value: '(16) 99792-4683' },
          { id: 'evo-g13', title: 'E-mail Contato', type: 'text', status: 'Done', value: 'ricardo.frajuca@morada.com.br' },
          { id: 'evo-g14', title: 'Website', type: 'text', status: 'Done', value: 'https://morada.com.br/' }
        ]
      },
      {
        id: 'evo-chk-3',
        title: 'Infraestrutura e Recursos; capabilidade',
        status: 'Done',
        responsible: 'Comercial',
        subtasks: [
          { id: 'evo-i1', title: 'Unidades com SASSMAQ (SP)', type: 'text', status: 'Done', value: 'Sim - Araraquara, Americana e Cubatão' },
          { id: 'evo-i2', title: 'Unidades com SASSMAQ (PR)', type: 'text', status: 'Done', value: 'Sim - Sarandi' },
          { id: 'evo-i3', title: 'Unidades com SASSMAQ (SC / ES)', type: 'text', status: 'Done', value: 'Não' },
          { id: 'evo-i4', title: 'Principais Filiais', type: 'text', status: 'Done', value: 'Americana/SP, Cubatão/SP, Belo Horizonte/MG, Sarandi/PR, Campo Grande/MS' },
          { id: 'evo-i5', title: 'Possíveis adequações / Mix utiliz.', type: 'text', status: 'Done', value: 'Não evidenciado' },
          { id: 'evo-i6', title: 'Funcionários (excl. motoristas)', type: 'text', status: 'Done', value: 'Não evidenciado' },
          { id: 'evo-i7', title: 'Motoristas CLT (próprios)', type: 'text', status: 'Done', value: 'Não evidenciado' },
          { id: 'evo-i8', title: 'Cavalos (Próprios e Subcontratados)', type: 'text', status: 'Done', value: 'Não evidenciado' },
          { id: 'evo-i9', title: 'Semi-reboques (tanque Líquidos/Vanderleia/Aço)', type: 'text', status: 'Done', value: 'Não evidenciado (em todas as capacidades e tipos de inox/carbono)' },
          { id: 'evo-i10', title: 'Semi-reboques vaso pressão', type: 'text', status: 'Done', value: 'Não evidenciado' },
          { id: 'evo-i11', title: 'Semi-reboques porta containers', type: 'text', status: 'Done', value: 'Não evidenciado' },
          { id: 'evo-i12', title: 'Semi-reboques carreta convencional e vanderleia', type: 'text', status: 'Done', value: 'Não evidenciado' },
          { id: 'evo-i13', title: 'Integrações via API c/ TMS Evonik?', type: 'text', status: 'Done', value: 'Não evidenciado' },
          { id: 'evo-i14', title: 'Sistema p/ controle Comprovantes Entrega?', type: 'text', status: 'Done', value: 'Não evidenciado' },
          { id: 'evo-i15', title: 'Sistemas TMS atuais / Integração SAP?', type: 'text', status: 'Done', value: 'Não evidenciado' }
        ]
      },
      {
        id: 'evo-chk-4',
        title: 'Certificados e Seguros',
        status: 'Done',
        responsible: 'Comercial',
        subtasks: [
          { id: 'evo-c1', title: 'Possui o SASSMAQ?', type: 'text', status: 'Done', value: 'Sim (SASSMAQ Abiquim - Validade: Março/2026)' },
          { id: 'evo-c2', title: 'Cobre perfil "FROTA", "Nacional", etc?', type: 'text', status: 'Done', value: 'Não evidenciado' },
          { id: 'evo-c3', title: 'Possui ISO 9001?', type: 'text', status: 'Done', value: 'Sim (Validade: Abril/2026)' },
          { id: 'evo-c4', title: 'Possui ISO 14001 / 45001 / TfS?', type: 'text', status: 'Done', value: 'Não evidenciado' },
          { id: 'evo-c5', title: 'Possui ISO 39001?', type: 'text', status: 'Done', value: 'Sim (Validade: Abril/2026)' },
          { id: 'evo-c6', title: 'Possui PAE cobertura nacional?', type: 'single-select', status: 'Done', value: 'Sim', options: ['Sim', 'Não'] },
          { id: 'evo-c7', title: 'Licenças (Polícia Civil, Federal, Exército)', type: 'text', status: 'Done', value: 'Sim (todas)' },
          { id: 'evo-c8', title: 'Apólice RCTR-C', type: 'text', status: 'Done', value: 'Sim (Vencimento: 31/12/2023)' },
          { id: 'evo-c9', title: 'Apólice RC-DC', type: 'text', status: 'Done', value: 'Sim (R$ 1.000.000,00 - Vencimento: 31/12/2025)' },
          { id: 'evo-c10', title: 'Apólice RC-V', type: 'text', status: 'Done', value: 'Sim (R$ 700k Danos Mat/Corp, R$ 50k Morais - Vencimento: 15/03/2026)' },
          { id: 'evo-c11', title: 'Seguro Ambiental', type: 'text', status: 'Done', value: 'Sim (R$ 500k/evento, R$ 1M agregado - Vencimento: 11/04/2026)' }
        ]
      },
      {
        id: 'evo-chk-5',
        title: 'Informações Financeiras',
        status: 'Done',
        responsible: 'Comercial',
        subtasks: [
          { id: 'evo-f1', title: 'Receita Total 2022/2023/2024 (R$) e % Transportes', type: 'text', status: 'Done', value: 'Não evidenciado' },
          { id: 'evo-f2', title: 'Lucro Líquido em 2024 (% da receita)', type: 'text', status: 'Done', value: 'Não evidenciado' },
          { id: 'evo-f3', title: 'Receita projetada c/ % Transportes para 2025 (R$)', type: 'text', status: 'Done', value: 'Não evidenciado' },
          { id: 'evo-f4', title: 'Planos de investimentos 2025+2026', type: 'text', status: 'Done', value: 'Não evidenciado' },
          { id: 'evo-f5', title: 'Abertura de novas filiais / Aquisição de veículos', type: 'text', status: 'Done', value: 'Não evidenciado' },
          { id: 'evo-f6', title: 'Restrições SERASA', type: 'text', status: 'Done', value: 'Não evidenciado' }
        ]
      },
      {
        id: 'evo-chk-6',
        title: 'Principais Clientes e Referências',
        status: 'Done',
        responsible: 'Comercial',
        subtasks: [
          { id: 'evo-cl1', title: 'Clientes 1 a 5 (Detalhes de volume e rotas)', type: 'text', status: 'Done', value: 'Não evidenciado nos detalhes (Nomes citados na seção 2)' },
          { id: 'evo-cl2', title: 'Lista de Contatos de Clientes 1 a 5', type: 'text', status: 'Done', value: 'Não evidenciado' }
        ]
      }
    ], history: [], contactName: 'Ricardo Braga Frajuca', contactEmail: 'ricardo.frajuca@morada.com.br', contactPhone: '(16) 99792-4683', contactIsWhatsApp: false, contactLink: '', empresa: 'Morada Transportes', filial: 'Araraquara'
  },
  { id: '6', clientName: 'Flora Produtos De Higiene E Limpeza S/A', status: 'Approved', deadline: '2026-02-27', followUpDate: '', priority: 'medium', notes: '', checklist: [], history: [], contactName: '', contactEmail: '', contactPhone: '', contactIsWhatsApp: false, contactLink: '', empresa: '', filial: '', completed: true },
  {
    id: '11', clientName: 'FS Bioenergia', status: 'Approved', deadline: '2026-02-27', followUpDate: '', priority: 'medium', notes: '', checklist: [
      {
        id: 'fs-chk-1',
        title: 'Documentação Corretora',
        status: 'Done',
        responsible: 'Financeiro',
        subtasks: [
          { id: 'fs-st1', title: 'Apólice RCTR (Morada)', type: 'attachment', status: 'Done', value: 'OK' },
          { id: 'fs-st2', title: 'Apólice RC-DC (Morada)', type: 'attachment', status: 'Done', value: 'OK' },
          { id: 'fs-st3', title: 'Apólice RC-DC (Itaobi)', type: 'attachment', status: 'Done', value: 'OK' }
        ]
      },
      {
        id: 'fs-chk-2',
        title: 'Envio de Apólices',
        status: 'Done',
        responsible: 'Financeiro',
        subtasks: [
          { id: 'fs-st4', title: 'Envio Apólice RCTR-C', type: 'attachment', status: 'Done', value: 'OK' },
          { id: 'fs-st5', title: 'Envio Apólice RC-DC', type: 'attachment', status: 'Done', value: 'OK' }
        ]
      }
    ], history: [], contactName: '', contactEmail: '', contactPhone: '', contactIsWhatsApp: false, contactLink: '', empresa: '', filial: '', completed: true
  },
  { id: '16', clientName: 'Go Flux', status: 'Rejected', deadline: '2026-02-27', followUpDate: '', priority: 'medium', notes: 'GO FLUX: negociação como perdida, motivo: Preço\nValor cobrado pelo serviço de disponibilizar fretes muito alto e sem garantia de resultado', checklist: [], history: [], contactName: '', contactEmail: '', contactPhone: '', contactIsWhatsApp: false, contactLink: '', empresa: '', filial: '', completed: true },
  { id: '20', clientName: 'Gomes De Carvalho', status: 'Not Started', deadline: '2026-02-27', followUpDate: '', priority: 'medium', notes: '', checklist: [], history: [], contactName: '', contactEmail: '', contactPhone: '', contactIsWhatsApp: false, contactLink: '', empresa: '', filial: '' },
  {
    id: '8', clientName: 'Grupo Petropolis', status: 'Approved', deadline: '2026-02-27', followUpDate: '', priority: 'medium', notes: '', checklist: [
      {
        id: 'gp-checklist-2',
        title: 'Preenchimento RFI',
        status: 'Done',
        responsible: 'Comercial',
        subtasks: [
          { id: 'gp-r1', title: 'Razão Social da Transportadora', type: 'text', status: 'Done', value: 'RODOVIARIO MORADA DO SOL LTDA' },
          { id: 'gp-r2', title: 'CNPJ da Matriz', type: 'text', status: 'Done', value: '43.954.460/0001-61' },
          { id: 'gp-r3', title: 'Data de Fundação da Transportadora', type: 'text', status: 'Done', value: '22/02/1962' },
          { id: 'gp-r4', title: 'Seguradora está ativa?', type: 'single-select', status: 'Done', value: 'Sim', options: ['Sim', 'Não'] },
          { id: 'gp-r5', title: 'Trabalha com alguma empresa do ramo de bebidas?', type: 'text', status: 'Done', value: 'Heineken' },
          { id: 'gp-r6', title: 'Modais de Atuação', type: 'text', status: 'Done', value: 'Rodoviário' },
          { id: 'gp-r7', title: 'Qual operação do Grupo Petrópolis a transportadora tem interesse/perfil para atender?', type: 'text', status: 'Done', value: 'Frete Inbound, Frete Outbound Primário (Fábricas), Frete Outbound Secundário (CDS) e Frete SPOT / Emergencial' },
          { id: 'gp-r8', title: 'Região de Atendimento', type: 'text', status: 'Done', value: 'Centro-Oeste e Sudeste' },
          { id: 'gp-r9', title: 'Tamanho da Frota Atual (Apenas Frota Própria)', type: 'number', status: 'Done', value: 124 },
          { id: 'gp-r10', title: 'A frota tem rastreamento, monitoramento, TMS, etc?', type: 'single-select', status: 'Done', value: 'Sim', options: ['Sim', 'Não'] },
          { id: 'gp-r11', title: 'Idade Média da Frota (Em Anos)', type: 'number', status: 'Done', value: 4.47 },
          { id: 'gp-r12', title: 'Contato Comercial (E-mail)', type: 'text', status: 'Done', value: 'comercial@morada.com.br' },
          { id: 'gp-r13', title: 'Contato Comercial (Telefone)', type: 'text', status: 'Done', value: '(16) 99792-4683' },
          { id: 'gp-r14', title: 'Contato Operacional (E-mail)', type: 'text', status: 'Done', value: 'miqueias.almeida@morada.com.br' },
          { id: 'gp-r15', title: 'Contato Financeiro (E-mail)', type: 'text', status: 'Done', value: 'financeiro@morada.com.br' },
        ]
      }
    ], history: [], contactName: 'Evelyn Souza', contactEmail: 'evsouza@grupopetropolis.com.br', contactPhone: '-', contactIsWhatsApp: false, contactLink: 'https://forms.office.com/Pages/ResponsePage.aspx?id=YaUhhsQ11EiWizqpu7MLx54cnZX4bt1NmoJWcLKtkN5UNUo0S0I4UExWSDdNQ0ZKTTVXWFU5TjRTVS4u&origin=QRCode', empresa: 'Morada', filial: '', completed: true
  },
  { id: '1', clientName: 'Heineken', status: 'Approved', deadline: '2026-02-27', followUpDate: '', priority: 'medium', notes: '', checklist: [], history: [], contactName: '', contactEmail: '', contactPhone: '', contactIsWhatsApp: false, contactLink: '', empresa: '', filial: '', completed: true },
  { id: '10', clientName: 'Inpasa', status: 'Rejected', deadline: '2026-02-27', followUpDate: '', priority: 'medium', notes: 'Inpasa: negociação como perdida, motivo: Outros\nCusto para licença inviabiliza o processo.', checklist: [], history: [], contactName: '', contactEmail: '', contactPhone: '', contactIsWhatsApp: false, contactLink: '', empresa: '', filial: '', completed: true },
  { id: '3', clientName: 'Logshare', status: 'Approved', deadline: '2026-02-27', followUpDate: '', priority: 'medium', notes: '', checklist: [], history: [], contactName: '', contactEmail: '', contactPhone: '', contactIsWhatsApp: false, contactLink: '', empresa: '', filial: '', completed: true },
  { id: '5', clientName: 'Mercado Livre', status: 'Approved', deadline: '2026-02-27', followUpDate: '', priority: 'medium', notes: '', checklist: [], history: [], contactName: '', contactEmail: '', contactPhone: '', contactIsWhatsApp: false, contactLink: '', empresa: '', filial: '', completed: true },
  {
    id: '4', clientName: 'Minerva Foods', status: 'Waiting on Sector', deadline: '2026-02-26', followUpDate: '', priority: 'medium', notes: 'Selecionar "Primária (Longo Percurso)" na plataforma.', checklist: [
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
    id: '14', clientName: 'Novelis', status: 'In Progress', deadline: '2026-02-27', followUpDate: '', priority: 'medium', notes: '', checklist: [
      {
        id: 'nov-chk-1',
        title: 'Dados Gerais',
        status: 'Done',
        responsible: 'Comercial',
        subtasks: [
          { id: 'nov-d1', title: 'Nome da Empresa', type: 'text', status: 'Done', value: 'RODOVIÁRIO MORADA DO SOL LTDA' },
          { id: 'nov-d2', title: 'Site', type: 'text', status: 'Done', value: 'https://morada.com.br/' },
          { id: 'nov-d3', title: 'Cargo do Contato', type: 'text', status: 'Done', value: 'Diretor de Operações / Gerente Comercial' },
          { id: 'nov-d4', title: 'E-mail do Contato', type: 'text', status: 'Done', value: 'comercial@morada.com.br / gustavo.geraldo@grupomorada.com.br' },
          { id: 'nov-d5', title: 'Telefone de Contato', type: 'text', status: 'Done', value: '(19) 3466-8400 / (16) 99115-5946 / (16) 99792-4683' },
          { id: 'nov-d6', title: 'Faturamento 2023', type: 'text', status: 'Done', value: 'R$ 681.371.459,00' },
          { id: 'nov-d7', title: 'Faturamento 2024', type: 'text', status: 'Done', value: 'R$ 598.517.113,00' },
          { id: 'nov-d8', title: 'ISO 9001:2015?', type: 'text', status: 'Done', value: 'Consta certificação ISO 9000 (Validade: Abril/2026)' }
        ]
      },
      {
        id: 'nov-chk-2',
        title: 'Relação com Novelis',
        status: 'Done',
        responsible: 'Comercial',
        subtasks: [
          { id: 'nov-n1', title: 'É fornecedor atual da Novelis?', type: 'single-select', status: 'Done', value: 'Não', options: ['Sim', 'Não'] },
          { id: 'nov-n2', title: 'A quantos anos fornece para a Novelis (Anos)?', type: 'text', status: 'Done', value: 'N/A' },
          { id: 'nov-n3', title: 'Qual o faturamento anual com a Novelis?', type: 'text', status: 'Done', value: 'N/A' },
          { id: 'nov-n4', title: 'Qual a representatividade da Novelis no seu faturamento?', type: 'text', status: 'Done', value: 'N/A' }
        ]
      },
      {
        id: 'nov-chk-3',
        title: 'Principais Clientes',
        status: 'Done',
        responsible: 'Comercial',
        subtasks: [
          { id: 'nov-cl1', title: 'Qual seu principal cliente hoje em faturamento?', type: 'text', status: 'Done', value: 'Raizen' },
          { id: 'nov-cl2', title: 'Qual o segmento de atuação? (Cliente 1)', type: 'text', status: 'Done', value: 'Combustível' },
          { id: 'nov-cl3', title: 'Qual o % de faturamento com esse cliente?', type: 'text', status: 'Done', value: '' },
          { id: 'nov-cl4', title: 'Qual a região de atuação com esse cliente?', type: 'text', status: 'Done', value: '' },
          { id: 'nov-cl5', title: 'Qual o veículo mais utilizado com esse cliente?', type: 'text', status: 'Done', value: '' },
          { id: 'nov-cl6', title: 'Qual o nome do contato comercial desse cliente?', type: 'text', status: 'Done', value: '' },
          { id: 'nov-cl7', title: 'Qual e-mail de contato comercial desse cliente?', type: 'text', status: 'Done', value: '' },
          { id: 'nov-cl8', title: 'Qual o telefone de contato desse cliente?', type: 'text', status: 'Done', value: '' },
          { id: 'nov-cl9', title: 'Qual seu segundo principal cliente hoje em faturamento?', type: 'text', status: 'Done', value: '' },
          { id: 'nov-cl10', title: 'Qual o segmento de atuação? (Cliente 2)', type: 'text', status: 'Done', value: '' },
          { id: 'nov-cl11', title: 'Qual o % de faturamento com esse cliente? (Cliente 2)', type: 'text', status: 'Done', value: '' },
          { id: 'nov-cl12', title: 'Qual a região de atuação com esse cliente? (Cliente 2)', type: 'text', status: 'Done', value: '' },
          { id: 'nov-cl13', title: 'Qual o veículo mais utilizado com esse cliente? (Cliente 2)', type: 'text', status: 'Done', value: '' },
          { id: 'nov-cl14', title: 'Qual o nome do contato comercial desse cliente? (Cliente 2)', type: 'text', status: 'Done', value: '' },
          { id: 'nov-cl15', title: 'Qual e-mail de contato comercial desse cliente? (Cliente 2)', type: 'text', status: 'Done', value: '' },
          { id: 'nov-cl16', title: 'Qual o telefone de contato desse cliente? (Cliente 2)', type: 'text', status: 'Done', value: '' },
          { id: 'nov-cl17', title: 'Qual seu terceiro principal cliente hoje em faturamento?', type: 'text', status: 'Done', value: '' },
          { id: 'nov-cl18', title: 'Qual o segmento de atuação? (Cliente 3)', type: 'text', status: 'Done', value: '' },
          { id: 'nov-cl19', title: 'Qual o % de faturamento com esse cliente? (Cliente 3)', type: 'text', status: 'Done', value: '' },
          { id: 'nov-cl20', title: 'Qual a região de atuação com esse cliente? (Cliente 3)', type: 'text', status: 'Done', value: '' },
          { id: 'nov-cl21', title: 'Qual o veículo mais utilizado com esse cliente? (Cliente 3)', type: 'text', status: 'Done', value: '' },
          { id: 'nov-cl22', title: 'Qual o nome do contato comercial desse cliente? (Cliente 3)', type: 'text', status: 'Done', value: '' },
          { id: 'nov-cl23', title: 'Qual e-mail de contato comercial desse cliente? (Cliente 3)', type: 'text', status: 'Done', value: '' },
          { id: 'nov-cl24', title: 'Qual o telefone de contato desse cliente? (Cliente 3)', type: 'text', status: 'Done', value: '' }
        ]
      },
      {
        id: 'nov-chk-4',
        title: 'Atuação',
        status: 'NotStarted',
        responsible: 'Comercial',
        subtasks: [
          { id: 'nov-a1', title: 'Informações Filial/Matriz', type: 'text', status: 'NotStarted', value: '' },
          { id: 'nov-a2', title: 'Possui Filial/Matriz no estado', type: 'text', status: 'NotStarted', value: '' },
          { id: 'nov-a3', title: 'Munícipio Filial Principal', type: 'text', status: 'NotStarted', value: '' },
          { id: 'nov-a4', title: 'Consolidação de carga', type: 'text', status: 'NotStarted', value: '' },
          { id: 'nov-a5', title: 'Tem expertise em frete fracionado (Manutenção/Reparos/Operações)', type: 'text', status: 'NotStarted', value: '' },
          { id: 'nov-a6', title: 'Próprio/Alugado', type: 'text', status: 'NotStarted', value: '' },
          { id: 'nov-a7', title: 'Área Total (m²)', type: 'text', status: 'NotStarted', value: '' },
          { id: 'nov-a8', title: 'Área disponível(m²)', type: 'text', status: 'NotStarted', value: '' },
          { id: 'nov-a9', title: 'Funcionamento 24h', type: 'text', status: 'NotStarted', value: '' },
          { id: 'nov-a10', title: 'Funcionamento Final de Semana', type: 'text', status: 'NotStarted', value: '' },
          { id: 'nov-a11', title: 'Quantidade de funcionários próprios', type: 'text', status: 'NotStarted', value: '' },
          { id: 'nov-a12', title: 'Segurança', type: 'text', status: 'NotStarted', value: '' },
          { id: 'nov-a13', title: 'Barreiras físicas ≥ 2m de altura em todo o perímetro', type: 'text', status: 'NotStarted', value: '' },
          { id: 'nov-a14', title: 'Proteção perimetral contra invasão', type: 'text', status: 'NotStarted', value: '' },
          { id: 'nov-a15', title: 'Controle de Acesso', type: 'text', status: 'NotStarted', value: '' },
          { id: 'nov-a16', title: 'Portões e/ou cancelas', type: 'text', status: 'NotStarted', value: '' },
          { id: 'nov-a17', title: 'Circuito fechado de CFTV com gravação', type: 'text', status: 'NotStarted', value: '' },
          { id: 'nov-a18', title: 'Câmeras que visualizem entrada e saída', type: 'text', status: 'NotStarted', value: '' },
          { id: 'nov-a19', title: 'Câmeras que visualizem veículos estacionados no interior', type: 'text', status: 'NotStarted', value: '' },
          { id: 'nov-a20', title: 'Câmeras que visualizem perímetro externo', type: 'text', status: 'NotStarted', value: '' }
        ]
      },
      {
        id: 'nov-chk-5',
        title: 'Frota (Própria)',
        status: 'NotStarted',
        responsible: 'Comercial',
        subtasks: [
          { id: 'nov-fp1', title: 'Quantidade de veículos', type: 'text', status: 'NotStarted', value: '' },
          { id: 'nov-fp2', title: 'Idade da frota em anos (Média)', type: 'text', status: 'NotStarted', value: '' },
          { id: 'nov-fp3', title: 'Fornecedor Reboque/Semireboque', type: 'text', status: 'NotStarted', value: '' },
          { id: 'nov-fp4', title: 'Fornecedor Caminhão', type: 'text', status: 'NotStarted', value: '' },
          { id: 'nov-fp5', title: '% Sider', type: 'text', status: 'NotStarted', value: '' },
          { id: 'nov-fp6', title: 'Abertura de Portas cabine (Mot/Car)', type: 'text', status: 'NotStarted', value: '' },
          { id: 'nov-fp7', title: 'Violação do painel', type: 'text', status: 'NotStarted', value: '' },
          { id: 'nov-fp8', title: 'Desengate de carreta (veíc. articulados)', type: 'text', status: 'NotStarted', value: '' },
          { id: 'nov-fp9', title: 'Violação de antena', type: 'text', status: 'NotStarted', value: '' },
          { id: 'nov-fp10', title: 'Ignição (liga/desliga)', type: 'text', status: 'NotStarted', value: '' },
          { id: 'nov-fp11', title: 'Velocidade', type: 'text', status: 'NotStarted', value: '' },
          { id: 'nov-fp12', title: 'Tela de janelas (com sensor)', type: 'text', status: 'NotStarted', value: '' },
          { id: 'nov-fp13', title: 'Dispositivo bloqueio do veículo (combustível e/ou ignição)', type: 'text', status: 'NotStarted', value: '' },
          { id: 'nov-fp14', title: 'Sirene e luzes de advertência', type: 'text', status: 'NotStarted', value: '' },
          { id: 'nov-fp15', title: 'Botão de pânico ou emergência', type: 'text', status: 'NotStarted', value: '' },
          { id: 'nov-fp16', title: 'Terminal de comunicação (teclado)', type: 'text', status: 'NotStarted', value: '' },
          { id: 'nov-fp17', title: 'Trava de 5ª roda', type: 'text', status: 'NotStarted', value: '' },
          { id: 'nov-fp18', title: 'Protetor de estribo', type: 'text', status: 'NotStarted', value: '' },
          { id: 'nov-fp19', title: 'Telemetria', type: 'text', status: 'NotStarted', value: '' },
          { id: 'nov-fp20', title: 'Rastreador fixo no reboque ou semi-reboque', type: 'text', status: 'NotStarted', value: '' }
        ]
      },
      {
        id: 'nov-chk-6',
        title: 'Frota (Agregados)',
        status: 'NotStarted',
        responsible: 'Comercial',
        subtasks: [
          { id: 'nov-fa1', title: 'Quantidade de veículos', type: 'text', status: 'NotStarted', value: '' },
          { id: 'nov-fa2', title: 'Idade da frota em anos (Média)', type: 'text', status: 'NotStarted', value: '' },
          { id: 'nov-fa3', title: '% Sider', type: 'text', status: 'NotStarted', value: '' },
          { id: 'nov-fa4', title: 'Abertura de Portas cabine (Mot/Car)', type: 'text', status: 'NotStarted', value: '' },
          { id: 'nov-fa5', title: 'Violação do painel', type: 'text', status: 'NotStarted', value: '' },
          { id: 'nov-fa6', title: 'Desengate de carreta (veíc. articulados)', type: 'text', status: 'NotStarted', value: '' },
          { id: 'nov-fa7', title: 'Violação de antena', type: 'text', status: 'NotStarted', value: '' },
          { id: 'nov-fa8', title: 'Ignição (liga/desliga)', type: 'text', status: 'NotStarted', value: '' },
          { id: 'nov-fa9', title: 'Velocidade', type: 'text', status: 'NotStarted', value: '' },
          { id: 'nov-fa10', title: 'Tela de janelas (com sensor)', type: 'text', status: 'NotStarted', value: '' },
          { id: 'nov-fa11', title: 'Dispositivo bloqueio do veículo (combustível e/ou ignição)', type: 'text', status: 'NotStarted', value: '' },
          { id: 'nov-fa12', title: 'Sirene e luzes de advertência', type: 'text', status: 'NotStarted', value: '' },
          { id: 'nov-fa13', title: 'Botão de pânico ou emergência', type: 'text', status: 'NotStarted', value: '' },
          { id: 'nov-fa14', title: 'Terminal de comunicação (teclado)', type: 'text', status: 'NotStarted', value: '' },
          { id: 'nov-fa15', title: 'Trava de 5ª roda', type: 'text', status: 'NotStarted', value: '' },
          { id: 'nov-fa16', title: 'Protetor de estribo', type: 'text', status: 'NotStarted', value: '' },
          { id: 'nov-fa17', title: 'Telemetria', type: 'text', status: 'NotStarted', value: '' },
          { id: 'nov-fa18', title: 'Rastreador fixo no reboque ou semi-reboque', type: 'text', status: 'NotStarted', value: '' }
        ]
      },
      {
        id: 'nov-chk-7',
        title: 'Gerenciamento de Riscos',
        status: 'NotStarted',
        responsible: 'Comercial',
        subtasks: [
          { id: 'nov-gr1', title: 'Nome da seguradora', type: 'text', status: 'NotStarted', value: '' },
          { id: 'nov-gr2', title: 'Valor de Cobertura da apólice por veículo', type: 'text', status: 'NotStarted', value: '' },
          { id: 'nov-gr3', title: 'Aceita trabalhar com DDR?', type: 'text', status: 'NotStarted', value: '' },
          { id: 'nov-gr4', title: 'Tecnologia TMS', type: 'text', status: 'NotStarted', value: '' },
          { id: 'nov-gr5', title: 'Tecnologia WMS', type: 'text', status: 'NotStarted', value: '' },
          { id: 'nov-gr6', title: 'Tecnologia ERP', type: 'text', status: 'NotStarted', value: '' },
          { id: 'nov-gr7', title: 'Tecnologia EDI', type: 'text', status: 'NotStarted', value: '' },
          { id: 'nov-gr8', title: 'Experiência com integração de sistemas com cliente', type: 'text', status: 'NotStarted', value: '' },
          { id: 'nov-gr9', title: 'Tecnologia de Rastreamento Satelital', type: 'text', status: 'NotStarted', value: '' },
          { id: 'nov-gr10', title: 'Tecnologia de rastreamento GSM', type: 'text', status: 'NotStarted', value: '' },
          { id: 'nov-gr11', title: 'Tecnologia de Rastreamento Híbrido', type: 'text', status: 'NotStarted', value: '' },
          { id: 'nov-gr12', title: 'Tecnologia de Redundancia', type: 'text', status: 'NotStarted', value: '' },
          { id: 'nov-gr13', title: 'Tecnologia de Rastreadores secundários (Instalados no Implemento)', type: 'text', status: 'NotStarted', value: '' }
        ]
      }
    ], history: [], contactName: '', contactEmail: '', contactPhone: '', contactIsWhatsApp: false, contactLink: '', empresa: '', filial: ''
  },
  { id: '17', clientName: 'Pão De Açucar', status: 'Not Started', deadline: '2026-02-27', followUpDate: '', priority: 'medium', notes: '', checklist: [], history: [], contactName: '', contactEmail: '', contactPhone: '', contactIsWhatsApp: false, contactLink: '', empresa: '', filial: '' },
  { id: '18', clientName: 'Permetal', status: 'Not Started', deadline: '2026-02-27', followUpDate: '', priority: 'medium', notes: '', checklist: [], history: [], contactName: '', contactEmail: '', contactPhone: '', contactIsWhatsApp: false, contactLink: '', empresa: '', filial: '' },
  { id: '12', clientName: 'Raízen', status: 'Approved', deadline: '2026-02-27', followUpDate: '', priority: 'medium', notes: '', checklist: [], history: [], contactName: '', contactEmail: '', contactPhone: '', contactIsWhatsApp: false, contactLink: '', empresa: '', filial: '', completed: true },
  {
    id: '9',
    clientName: 'Royal Fic Combustível',
    status: 'Approved',
    deadline: '2026-02-27',
    followUpDate: '',
    priority: 'medium',
    notes: 'Estado de cotação concluída! Status "VENDIDO" em 19/01/2026.',
    checklist: [
      {
        id: 'roy-chk-1',
        title: 'Checklist',
        status: 'Done',
        responsible: 'Comercial',
        subtasks: [
          { id: 'roy-st1', title: 'RFI Concluido', type: 'text', status: 'Done', value: 'Concluído' }
        ]
      }
    ],
    history: [],
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    contactIsWhatsApp: false,
    contactLink: '',
    empresa: '',
    filial: '', completed: true
  },
  { id: '19', clientName: 'Santa Helena', status: 'Rejected', deadline: '2026-02-27', followUpDate: '', priority: 'medium', notes: 'Cotação rejeitada. Motivo da perda: Outros.\nCotação para regiões de origem que não atendemos.', checklist: [], history: [], contactName: '', contactEmail: '', contactPhone: '', contactIsWhatsApp: false, contactLink: '', empresa: '', filial: '', completed: true },
  {
    id: '15', clientName: 'Valgroup', status: 'Approved', deadline: '2026-02-27', followUpDate: '', priority: 'medium', notes: '', checklist: [
      {
        id: 'vg-checklist-1',
        title: 'Informações Cadastrais',
        status: 'Done',
        responsible: 'Comercial',
        subtasks: [
          { id: 'vg-c1', title: 'CNPJ', type: 'text', status: 'Done', value: '43.954.460/0001-61' },
          { id: 'vg-c2', title: 'Razão Social', type: 'text', status: 'Done', value: 'RODOVIARIO MORADA DO SOL LTDA' },
          { id: 'vg-c3', title: 'Inscrição Estadual', type: 'text', status: 'Done', value: '181.009.982.111' },
          { id: 'vg-c4', title: 'Optante pelo Simples Nacional?', type: 'single-select', status: 'Done', value: 'Não', options: ['Sim', 'Não'] },
          { id: 'vg-c5', title: 'Telefone 1 - Contato Comercial', type: 'text', status: 'Done', value: '(16) 99792-4683' },
          { id: 'vg-c6', title: 'E-mail de Comunicação e Envio de NFE', type: 'text', status: 'Done', value: 'nfe@morada.com.br' },
          { id: 'vg-c7', title: 'Telefone 2 - Contato Financeiro', type: 'text', status: 'Done', value: '(16) 99735-9004' },
          { id: 'vg-c8', title: 'E-mail do Envio de Laudo', type: 'text', status: 'Done', value: 'financeiro@morada.com.br' },
          { id: 'vg-c9', title: 'Banco', type: 'text', status: 'Done', value: '310 - VORTX DTVM LTDA.' },
          { id: 'vg-c10', title: 'Agência Bancária', type: 'text', status: 'Done', value: '0001' },
          { id: 'vg-c11', title: 'Agência Bancária - Dígito', type: 'text', status: 'Done', value: '-' },
          { id: 'vg-c12', title: 'Conta Corrente - Conta Bancária', type: 'text', status: 'Done', value: '00110923' },
          { id: 'vg-c13', title: 'Conta Corrente - Dígito', type: 'text', status: 'Done', value: '7' },
          { id: 'vg-c14', title: 'Nome completo do usuário', type: 'text', status: 'Done', value: 'Gustavo Henrique Geraldo' },
          { id: 'vg-c15', title: 'CPF do usuário', type: 'text', status: 'Done', value: '424.940.438-24' },
          { id: 'vg-c16', title: 'Email do usuário', type: 'text', status: 'Done', value: 'gustavo.geraldo@morada.com.br' }
        ]
      }
    ], history: [], contactName: '', contactEmail: '', contactPhone: '', contactIsWhatsApp: false, contactLink: '', empresa: '', filial: '', completed: true
  },
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
