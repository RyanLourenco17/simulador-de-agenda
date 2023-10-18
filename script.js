const btnDays = document.querySelectorAll(".day");
const btnWeek = document.querySelectorAll(".dayWeek")
const weeks = document.querySelector(".divWeeks")
const card = document.querySelector(".cardTwo");
const date = document.getElementById("data");
const time = document.getElementById("hora");
const desc = document.getElementById("description");
const task = document.querySelector(".divTasks")
const btnSubmit = document.querySelector(".save");
const btnShowMascotButton = document.querySelector(".bi-question-circle");
const doubt = document.querySelector(".doubt")
const btnClose = document.querySelector(".close");
const btnCloseDoubt = document.querySelector(".closeDoubt");

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
let currentMonthIndex = new Date().getMonth();

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
    const currentDate = updateCurrentDate();
    renderCalendar(currentDate.getFullYear(), currentDate.getMonth());
});

// Listener de evento para avançar o mês
nextMonthButton.addEventListener('click', () => {
    currentMonthIndex = (currentMonthIndex + 1) % 12;
    updateCurrentMonth();
    const currentDate = updateCurrentDate();
    renderCalendar(currentDate.getFullYear(), currentDate.getMonth());
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

// FUNÇÃO PARA SALVAR VALORES NO LOCALSTORAGE
function saveToLocalStorage(taskData) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.push(taskData);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// FUNÇÃO PARA CARREGAR TAREFAS DO LOCALSTORAGE
function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(taskData => {
        task.innerHTML += `
        <div class="task">
            <p class="taskName">
                ${taskData.description}
            </p>

            <p class="date">
                Tarefa a ser realizada em: <span>${taskData.date}</span> às: <span>${taskData.time}</span>;
            </p>

            <p class="taskWeek">
                ${taskData.weekDay}
            </p>

            <button class="delete">
                <i class="bi bi-trash3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                    </svg>
                </i>
            </button>
        </div> `;
    });

    // Adicione o event listener para os botões de exclusão
    const removeTask = document.querySelectorAll(".delete");
    for (let i = 0; i < removeTask.length; i++) {
        removeTask[i].onclick = function () {
            const taskIndex = i; // Índice da tarefa a ser removida
            const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            tasks.splice(taskIndex, 1); // Remove a tarefa do array
            localStorage.setItem('tasks', JSON.stringify(tasks)); // Atualiza o localStorage

            // Remove a tarefa do DOM
            this.parentNode.remove();
        };
    }
}


// Chama a função para carregar tarefas do localStorage quando a página for recarregada
window.addEventListener('load', loadTasksFromLocalStorage);

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

        // Solução do Bug de regressão de dia;
        const regressaoDeDia = inputDate.getDate();
        const solucaoRegressaoDeDia = regressaoDeDia + 1;
        const formattedDate = `${("0" + solucaoRegressaoDeDia).slice(-2)}/${
        ("0" + (inputDate.getMonth() + 1)).slice(-2)}/${
        inputDate.getFullYear()}`

        const [inputHours, inputMinutes] = time.value.split(':');

        const inputHour = new Date();
        inputHour.setHours(inputHours);
        inputHour.setMinutes(inputMinutes);

        const formattedHour = `${inputHour.getHours().toString().padStart(2, '0')}:${inputHour.getMinutes().toString().padStart(2, '0')}`;

        const taskData = {
            description: desc.value,
            date: formattedDate,
            time: formattedHour,
            weekDay: selectedWeek
        };

        // Salva os dados no localStorage
        saveToLocalStorage(taskData);

        // Renderiza a tarefa na interface do usuário

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
        selectedWeek = '';
    }
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

// Listener de evento para salvar tarefas ao clicar no botão
btnSubmit.addEventListener('click', saveTask);

// FUNÇÃO PARA CARREGAR O CALENDÁRIO
function loadCalendar() {
    const currentDate = new Date(); // Obtém a data atual
    const currentYear = currentDate.getFullYear(); // Obtém o ano atual
    const currentMonth = currentDate.getMonth(); // Obtém o mês atual

    // Renderiza o calendário com base no ano e mês atuais
    renderCalendar(currentYear, currentMonth);
}

// Chama a função para carregar o calendário quando a página for recarregada
window.addEventListener('load', loadCalendar);

// Função para renderizar o calendário com base no ano e mês fornecidos
function renderCalendar(year, month) {
    const containerDay = document.querySelector('.containerDay');
    containerDay.innerHTML = ''; // Limpa o conteúdo atual do calendário

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();

    const startingDayOfWeek = firstDayOfMonth.getDay(); // 0 (Domingo) a 6 (Sábado)

    // Obtém o último dia do mês anterior
    const lastDayOfPreviousMonth = new Date(year, month, 0);
    const daysInLastMonth = lastDayOfPreviousMonth.getDate();

    // Preenche os dias vazios no início do calendário com os últimos dias do mês anterior
    for (let i = 0; i < startingDayOfWeek; i++) {
        const day = daysInLastMonth - startingDayOfWeek + i + 1;
        const emptyDay = document.createElement('button');
        emptyDay.classList.add('day', 'pastDay');
        emptyDay.textContent = day;
        containerDay.appendChild(emptyDay);
    }
    
    // Preenche os dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
        const calendarDay = document.createElement('button');
        calendarDay.classList.add('day');
        calendarDay.textContent = day;
        containerDay.appendChild(calendarDay);

        calendarDay.addEventListener('click', () => {
            // Adiciona a classe 'active' ao elemento com a classe 'cardTwo'
            card.classList.add('active');
            calendarDay.classList.add('active');

            // VERIFICAR VERIFICAR
            // Define a data no campo "data" para o dia clicado e a hora atual
            date.value = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`; 
            const currentHour = new Date();
            time.value = `${currentHour.getHours().toString().padStart(2, '0')}:${currentHour.getMinutes().toString().padStart(2, '0')}`;
        });
    }
}

// FUNÇÃO DOUBT
btnShowMascotButton.addEventListener('click', () => {
    doubt.classList.add('activeDoubt');
});

btnCloseDoubt.addEventListener('click', () => {
    doubt.classList.remove('activeDoubt');
});