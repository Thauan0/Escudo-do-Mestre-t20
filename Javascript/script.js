document.addEventListener('DOMContentLoaded', function() {
    class NPC {
        constructor(nome, papel, descricao, imagem) {
            this.nome = nome;
            this.papel = papel;
            this.descricao = descricao;
            this.imagem = imagem;
        }
    }

    let npcs = JSON.parse(localStorage.getItem('npcs')) || [];

    // Atualiza a lista de NPCs no Local Storage
    function atualizarLocalStorage() {
        localStorage.setItem('npcs', JSON.stringify(npcs));
    }

    // Cadastrar NPC
    document.getElementById('form-npc').addEventListener('submit', function(event) {
        event.preventDefault();

        const nome = document.getElementById('nome-npc').value;
        const papel = document.getElementById('papel-npc').value;
        const descricao = document.getElementById('descricao-npc').value;
        const imagemFile = document.getElementById('imagem-npc').files[0];

        // Lê a imagem como base64
        let imagemUrl = '';
        if (imagemFile) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imagemUrl = e.target.result; // URL da imagem em base64
                const novoNPC = new NPC(nome, papel, descricao, imagemUrl);
                npcs.push(novoNPC);
                listarNPCs();
                atualizarLocalStorage(); // Atualiza o Local Storage
            };
            reader.readAsDataURL(imagemFile); // Lê a imagem
        } else {
            // Se não houver imagem, cria o NPC sem a imagem
            const novoNPC = new NPC(nome, papel, descricao, '');
            npcs.push(novoNPC);
            listarNPCs();
            atualizarLocalStorage(); // Atualiza o Local Storage
        }

        document.getElementById('form-npc').reset();
    });

    // Listar NPCs com imagem
    function listarNPCs() {
        const lista = document.getElementById('lista-npcs');
        lista.innerHTML = '';
        npcs.forEach((npc) => {
            const li = document.createElement('li');
            li.className = 'npc-item';

            li.innerHTML = `
                <img src="${npc.imagem}" alt="${npc.nome}" class="npc-image">
                <div class="npc-info">
                    <strong>${npc.nome}</strong> - ${npc.papel}
                    <p>${npc.descricao}</p>
                </div>
            `;

            // Botão de edição
            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.onclick = () => editarNPC(npc);
            li.appendChild(editButton);

            // Botão de exclusão
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Excluir';
            deleteButton.onclick = () => excluirNPC(npc);
            li.appendChild(deleteButton);

            lista.appendChild(li);
        });
    }

    // Editar NPC
    function editarNPC(npc) {
        document.getElementById('nome-npc').value = npc.nome;
        document.getElementById('papel-npc').value = npc.papel;
        document.getElementById('descricao-npc').value = npc.descricao;

        // Remove o NPC da lista antes da edição
        npcs = npcs.filter(item => item !== npc);
        listarNPCs();
        atualizarLocalStorage(); // Atualiza o Local Storage
    }

    // Excluir NPC
    function excluirNPC(npc) {
        npcs = npcs.filter(item => item !== npc);
        listarNPCs();
        atualizarLocalStorage(); // Atualiza o Local Storage
    }

    // Listar NPCs ao carregar a página
    listarNPCs();
});
