const postItWrapper = document.getElementById('post-it-wrapper');
const postItSizeSlider = document.getElementById('post-it-size-slider');
const addPostItButton = document.getElementById('add-post-it');

function loadPostIts() {
    const savedPostIts = JSON.parse(localStorage.getItem('postIts')) || [];
    savedPostIts.forEach(data => createPostIt(data.text, data.id));
}

function createPostIt(content = '', id = Date.now()) {
    const postIt = document.createElement('div');
    postIt.className = 'post-it';
    postIt.dataset.id = id;

    const newSize = postItSizeSlider.value + 'px';
    postIt.style.width = newSize;
    postIt.style.height = newSize;

    const textarea = document.createElement('textarea');
    textarea.className = 'post-it-textarea';
    textarea.placeholder = 'Escreva sua anotação...';
    textarea.value = content;
    textarea.readOnly = true;

    const editButton = document.createElement('button');
    editButton.innerHTML = '✏️';
    editButton.className = 'edit-post-it';
    editButton.addEventListener('click', () => {
        textarea.readOnly = !textarea.readOnly;
        editButton.innerHTML = textarea.readOnly ? '✏️' : '✅';
        if (textarea.readOnly) savePostIts();
    });

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '❌';
    deleteButton.className = 'delete-post-it';
    deleteButton.addEventListener('click', () => {
        postIt.remove();
        savePostIts();
    });

    postIt.appendChild(textarea);
    postIt.appendChild(editButton);
    postIt.appendChild(deleteButton);
    postItWrapper.appendChild(postIt);
}

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

addPostItButton.addEventListener('click', () => createPostIt());

loadPostIts();

postItSizeSlider.addEventListener('input', function() {
    const newSize = postItSizeSlider.value + 'px';
    document.querySelectorAll('.post-it').forEach(postIt => {
        postIt.style.width = newSize;
        postIt.style.height = newSize;
    });
});
