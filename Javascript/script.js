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

    function atualizarLocalStorage() {
        localStorage.setItem('npcs', JSON.stringify(npcs));
    }

    document.getElementById('form-npc').addEventListener('submit', function(event) {
        event.preventDefault();

        const nome = document.getElementById('nome-npc').value;
        const papel = document.getElementById('papel-npc').value;
        const descricao = document.getElementById('descricao-npc').value;
        const imagemFile = document.getElementById('imagem-npc').files[0];

        let imagemUrl = '';
        if (imagemFile) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imagemUrl = e.target.result;
                const novoNPC = new NPC(nome, papel, descricao, imagemUrl);
                npcs.push(novoNPC);
                listarNPCs();
                atualizarLocalStorage();
            };
            reader.readAsDataURL(imagemFile);
        } else {
            const novoNPC = new NPC(nome, papel, descricao, '');
            npcs.push(novoNPC);
            listarNPCs();
            atualizarLocalStorage();
        }

        document.getElementById('form-npc').reset();
    });

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

            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.onclick = () => editarNPC(npc);
            li.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Excluir';
            deleteButton.onclick = () => excluirNPC(npc);
            li.appendChild(deleteButton);

            lista.appendChild(li);
        });
    }

    function editarNPC(npc) {
        document.getElementById('nome-npc').value = npc.nome;
        document.getElementById('papel-npc').value = npc.papel;
        document.getElementById('descricao-npc').value = npc.descricao;

        npcs = npcs.filter(item => item !== npc);
        listarNPCs();
        atualizarLocalStorage();
    }

    function excluirNPC(npc) {
        npcs = npcs.filter(item => item !== npc);
        listarNPCs();
        atualizarLocalStorage();
    }

    listarNPCs();
});
