const btnDays = document.querySelectorAll(".day");
const btnWeek = document.querySelectorAll(".dayWeek")
const weeks = document.querySelector(".divWeeks")
const card = document.querySelector(".cardTwo");
const date = document.getElementById("data");
const time = document.getElementById("hora");
const desc = document.getElementById("description");
const task = document.querySelector(".divTasks")
const btnSubmit = document.querySelector(".save");
const btnClose = document.querySelector(".close")

// FUNÇÃO PARA TROCAR O TEMA
function switchTheme() {
    // Alterna as classes 'neonTheme' e 'lightTheme' no elemento <body> para trocar o tema.
    document.body.classList.toggle('neonTheme');
    document.body.classList.toggle('lightTheme');
    const theme = document.body.classList[0];
}

// FUNÇÃO PARA ALTERAR O MÊS
const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

// Índice do mês atual
let currentMonthIndex = 0;

// Elemento HTML que exibe o mês atual
const currentMonthElement = document.getElementById('currentMonth');

// Botões para avançar e retroceder meses
const prevMonthButton = document.getElementById('prevMonth');
const nextMonthButton = document.getElementById('nextMonth');

// Atualiza o mês exibido no elemento HTML
function updateCurrentMonth() {
    currentMonthElement.textContent = months[currentMonthIndex];
}

// Listener de evento para retroceder o mês
prevMonthButton.addEventListener('click', () => {
    currentMonthIndex = (currentMonthIndex - 1 + 12) % 12;
    updateCurrentMonth();
    currentDate = updateCurrentDate();
});

// Listener de evento para avançar o mês
nextMonthButton.addEventListener('click', () => {
    currentMonthIndex = (currentMonthIndex + 1) % 12;
    updateCurrentMonth();
    currentDate = updateCurrentDate();
});

// Inicializa o mês atual
updateCurrentMonth();

// Função para atualizar a data com o mês atual
function updateCurrentDate() {
    let currentDate = new Date();
    currentDate.setMonth(currentMonthIndex);
    return currentDate;
}

// FUNÇÃO DE FECHAR O SEGUNDO CARD
btnClose.addEventListener('click', () => {
    // Remove a classe 'active' do elemento com a classe 'cardTwo'
    card.classList.remove('active');
});

// FUNÇÃO DE ESCOLHER O DIA DO MÊS
btnDays.forEach(button => {
    button.addEventListener('click', () => {
        // Adiciona a classe 'active' ao elemento com a classe 'cardTwo'
        card.classList.add('active');
        button.classList.add('active');

        // Obtém o valor do dia do botão clicado
        const day = button.textContent;

        // Obtém a data atual
        let currentDate = updateCurrentDate();
        let currentHour = new Date();

        // Define a data no campo "data" para o dia clicado e a hora atual
        date.value = currentDate.getFullYear() + '-' + ("0" + (currentDate.getMonth() + 1)).slice(-2) + '-' + ("0" + day).slice(-2);
        
        time.value = `${currentHour.getHours().toString().padStart(2, '0')}:${currentHour.getMinutes().toString().padStart(2, '0')}`;
    });
});

// FUNÇÃO DE ESCOLHER O DIA DA SEMANA
let selectedWeek = '';
const daysOfWeek = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

btnWeek.forEach((button, index) => {
    button.addEventListener('click', () => {
        selectedWeek = daysOfWeek[index];
        weeks.innerHTML = `<p class="semana">Dia da semana: <span>${selectedWeek}</span></p>`;
    });
});

// Função para verificar se o elemento alvo está contido em algum botão
function isAnyButtonClicked(target) {
    for (const button of btnDays) {
        if (button.contains(target)) {
            return true;
        }
    }
    return false;
}

//FUNÇÃO ENTER
desc.addEventListener('keydown', function (event) {
    // Verifique se a tecla pressionada é "Enter" (código 13)
    if (event.keyCode === 13) {
        // Impede que o formulário seja enviado (comportamento padrão)
        event.preventDefault();

        // Chame a função para salvar a tarefa
        saveTask();
    }
});

// FUNÇÃO PARA SALVAR VALORES
function saveTask() {
    const errors = [];

    if (date.value.length === 0) {
        errors.push('Por favor, insira um dia.');
    }

    if (desc.value.length === 0) {
        errors.push('Por favor, insira uma descrição.');
    }

    if (time.value.length === 0) {
        errors.push('Por favor, insira um horário.');
    }

    if (selectedWeek.length === 0) {
        errors.push('Por favor, selecione um dia da semana.');
    }

    if (errors.length > 0) {
        const errorMessage = errors.join('\n');
        alert(errorMessage);
    } else {
        const inputDate = new Date(date.value);
        const formattedDate = `${("0" + inputDate.getDate()).slice(-2)}/${("0" + (inputDate.getMonth() + 1)).slice(-2)}/${inputDate.getFullYear()}`;

        const [inputHours, inputMinutes] = time.value.split(':');

        const inputHour = new Date();
        inputHour.setHours(inputHours);
        inputHour.setMinutes(inputMinutes);

        const formattedHour = `${inputHour.getHours().toString().padStart(2, '0')}:${inputHour.getMinutes().toString().padStart(2, '0')}`;

        task.innerHTML += `
        <div class="task">
            <p class="taskName">
                ${desc.value}
            </p>

            <p class="date">
                Tarefa a ser realizada em: <span>${formattedDate}</span> às: <span>${formattedHour}</span>;
            </p>

            <p class="taskWeek">
                ${selectedWeek}
            </p>

            <button class="delete">
                <i class="bi bi-trash3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                    </svg>
                </i>
            </button>
        </div> `;

        // Limpa os campos de entrada
        desc.value = '';
        date.value = '';
        time.value = '';
        weeks.innerHTML = '';

        // Adiciona um ouvinte de evento para o botão de exclusão dentro da nova tarefa
        const current_tasks = document.querySelectorAll(".delete");
        current_tasks[current_tasks.length - 1].addEventListener('click', function () {
            this.parentNode.remove();
        });
    }
}

// Listener de evento para salvar tarefas ao clicar no botão
btnSubmit.addEventListener('click', saveTask);

// Listener de evento para salvar tarefas ao pressionar a tecla "Enter"
document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        saveTask();
    }
});
