<template>
  <div class="flex bg-green-100">
    <NavbarPusat />

    <div class="flex-1 min-h-screen bg-green-100 px-6 md:px-12 lg:px-20 pt-5 mb-12 ml-50">
      <!-- Filter Waktu -->
      <div class="flex justify-center space-x-4 mt-6">
        <button v-for="filter in filters" :key="filter" @click="setActiveFilter(filter)" :class="[
          'px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300',
          activeFilter === filter ? 'bg-[#03a980] text-white' : 'bg-gray-200 text-gray-700 hover:bg-[#028a66]'
        ]">
          {{ filter }}
        </button>
      </div>

      <div class="p-2 mt-2 w-full">
        <div class="bg-green-200 p-6 rounded-lg shadow animate-fadeIn w-full h-full">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-semibold">Manajemen Chat Pusat</h2>
          </div>

          <!-- Responsive Chat Layout -->
          <div class="flex flex-col md:flex-row border rounded-lg overflow-hidden w-full h-[80vh]">
            <!-- Sidebar Chat List -->
            <div
              class="kelass w-full md:w-1/3 bg-blue-100 border-r overflow-y-auto p-4 animate-slideInLeft h-full md:h-auto">
              <input type="text" v-model="searchQuery"
                class="w-full p-2 border rounded-lg mb-4 transition-all duration-300" placeholder="Cari chat..." />
              <ul class="space-y-2">
                <li v-for="chat in filteredChatList" :key="chat.id"
                  class="p-4 border-b flex items-center gap-3 cursor-pointer hover:bg-gray-200 transition-all duration-200 transform hover:scale-105"
                  @click="selectChat(chat)">
                  <div class="w-10 h-10 bg-gray-300 rounded-full"></div>
                  <div class="flex-grow">
                    <h3 class="font-semibold">{{ chat.name }}</h3>
                    <p class="text-sm text-gray-600">{{ chat.lastMessage }}</p>
                  </div>
                  <button @click="deleteChat(chat.id)"
                    class="text-red-500 hover:text-red-700 transition duration-200">✖</button>
                </li>
              </ul>
            </div>

            <!-- Chat Content -->
            <div v-if="activeChat" class="w-full lg:w-[90%] bg-gray-100 flex flex-col p-4 lg:h-auto h-full">
              <div class="flex justify-between mb-4">
                <button @click="backToChatList" class="text-[#03a980] mb-4 md:hidden">Back to Chat List</button>
                <h3 class="text-lg font-bold text-gray-700">{{ activeChat.name }}</h3>
              </div>

              <div class="flex-grow overflow-y-auto max-h-full">
                <div v-for="message in activeChat.messages" :key="message.id" class="mb-4 animate-fadeInMessage">
                  <div v-if="message.sender === 'pusat'" class="flex justify-end">
                    <div class="bg-green-600 text-white p-3 rounded-lg max-w-xs transform transition-all duration-300">
                      {{ message.text }}</div>
                  </div>
                  <div v-else class="flex items-center gap-2">
                    <div class="w-10 h-10 bg-gray-300 rounded-full"></div>
                    <div class="bg-white p-3 rounded-lg max-w-xs transform transition-all duration-300">{{ message.text
                      }}</div>
                  </div>
                </div>
              </div>

              <!-- Message Input -->
              <div class="p-4 bg-white flex items-center gap-2 border-t mt-4">
                <input type="text" v-model="newMessage" class="w-full p-3 border rounded-lg"
                  placeholder="Ketik pesan..." @keyup.enter="sendMessage" />
                <button @click="sendMessage"
                  class="bg-green-600 text-white px-5 py-3 rounded-lg transform transition-all duration-300">Kirim</button>
              </div>
            </div>

            <!-- If no chat selected -->
            <div v-else class="flex-grow flex items-center justify-center text-gray-500">
              Pilih percakapan untuk melihat isi chat.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavbarPusat from '@/components/NavbarPusat.vue';

export default {
  components: {
    NavbarPusat,
  },
  data() {
    return {
      searchQuery: '',
      chatList: [
        { id: 1, name: 'Admin Wilayah 1', lastMessage: 'Update data pengguna?', messages: [{ sender: 'admin', text: 'Halo, pusat!', id: 1 }] },
        { id: 2, name: 'Admin Wilayah 2', lastMessage: 'Kami butuh konfirmasi', messages: [{ sender: 'admin', text: 'Ada yang perlu diverifikasi?', id: 2 }] },
        { id: 3, name: 'User - Fadli', lastMessage: 'Kapan sertifikat saya keluar?', messages: [{ sender: 'user', text: 'Kapan sertifikat saya bisa diambil?', id: 3 }] },
        { id: 4, name: 'User - Fadli', lastMessage: 'Kapan sertifikat saya keluar?', messages: [{ sender: 'user', text: 'Samporo wunga ta ncai', id: 4 }] },
        { id: 5, name: 'User - Fadli', lastMessage: 'Kapan sertifikat saya keluar?', messages: [{ sender: 'user', text: 'Mai Lao Teka ', id: 5 }] },
      ],
      activeChat: null,
      newMessage: '',
    };
  },
  computed: {
    filteredChatList() {
      return this.chatList.filter(chat => chat.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
    }
  },
  methods: {
    selectChat(chat) {
      this.activeChat = chat;
    },
    sendMessage() {
      if (this.newMessage.trim() !== '' && this.activeChat) {
        this.activeChat.messages.push({ id: Date.now(), sender: 'pusat', text: this.newMessage });
        this.activeChat.lastMessage = this.newMessage;
        this.newMessage = '';
      }
    },
    deleteChat(chatId) {
      this.chatList = this.chatList.filter(chat => chat.id !== chatId);
      if (this.activeChat && this.activeChat.id === chatId) {
        this.activeChat = null;
      }
    },
    backToChatList() {
      this.activeChat = null;
    },
  }
};
</script>

<style scoped>
/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.animate-fadeIn {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeInMessage {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeInMessage {
  animation: fadeInMessage 0.5s ease-out;
}

@keyframes slideInLeft {
  from {
    transform: translateX(-20%);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.animate-slideInLeft {
  animation: slideInLeft 0.5s ease-out;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .flex-col {
    flex-direction: column;
  }

  .w-full {
    width: 100%;
  }

  .kelass {
    width: 100%;
  }

  .md\:hidden {
    display: block;
  }
}
</style>