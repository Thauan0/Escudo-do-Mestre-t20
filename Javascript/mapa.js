const postItWrapper = document.getElementById('post-it-wrapper');
const postItSizeSlider = document.getElementById('post-it-size-slider');
const addPostItButton = document.getElementById('add-post-it');

// Função para carregar post-its do localStorage
function loadPostIts() {
    const savedPostIts = JSON.parse(localStorage.getItem('postIts')) || [];
    // Carrega post-its a partir do localStorage
    savedPostIts.forEach(data => createPostIt(data.text, data.id));
}

// Função para criar um post-it com os botões de Editar, Salvar e Excluir
function createPostIt(content = '', id = Date.now()) {
    const postIt = document.createElement('div');
    postIt.className = 'post-it';
    postIt.dataset.id = id;

    // Define o tamanho inicial do post-it com base no controle deslizante
    const newSize = postItSizeSlider.value + 'px';
    postIt.style.width = newSize;
    postIt.style.height = newSize;

    // Textarea do conteúdo
    const textarea = document.createElement('textarea');
    textarea.className = 'post-it-textarea';
    textarea.placeholder = 'Escreva sua anotação...';
    textarea.value = content;
    textarea.readOnly = true; // Inicialmente como somente leitura

    // Botão de Editar (alternando para Salvar)
    const editButton = document.createElement('button');
    editButton.innerHTML = '✏️'; // Emoji de lápis
    editButton.className = 'edit-post-it';
    editButton.addEventListener('click', () => {
        textarea.readOnly = !textarea.readOnly;
        editButton.innerHTML = textarea.readOnly ? '✏️' : '✅'; // Troca para emoji de check
        if (textarea.readOnly) savePostIts();
    });

    // Botão de Excluir
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '❌'; // Emoji de exclamação
    deleteButton.className = 'delete-post-it';
    deleteButton.addEventListener('click', () => {
        postIt.remove();
        savePostIts(); // Salva o estado atualizado sem o post-it
    });

    // Adiciona os elementos ao post-it
    postIt.appendChild(textarea);
    postIt.appendChild(editButton);
    postIt.appendChild(deleteButton);
    postItWrapper.appendChild(postIt);
}

// Função para salvar post-its no localStorage
function savePostIts() {
    const postIts = [];
    document.querySelectorAll('.post-it').forEach(postIt => {
        postIts.push({
            id: postIt.dataset.id,
            text: postIt.querySelector('textarea').value
        });
    });
    localStorage.setItem('postIts', JSON.stringify(postIts));
}

// Função para adicionar um novo post-it
addPostItButton.addEventListener('click', () => createPostIt());

// Carrega os post-its ao iniciar a página
loadPostIts();

// Controle de tamanho dos post-its
postItSizeSlider.addEventListener('input', function() {
    const newSize = postItSizeSlider.value + 'px';
    document.querySelectorAll('.post-it').forEach(postIt => {
        postIt.style.width = newSize;
        postIt.style.height = newSize;
    });
});
