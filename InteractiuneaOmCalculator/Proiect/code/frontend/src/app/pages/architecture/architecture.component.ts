import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslationService } from '../../services/translation.service';

interface ChatMessage {
  id: string;
  sender: string;
  role: 'admin' | 'user' | 'support' | 'system';
  text: string;
  time: string;
  channel: 'direct' | 'group';
}

@Component({
  selector: 'app-architecture',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './architecture.component.html',
  styleUrls: ['./architecture.component.scss']
})
export class ArchitectureComponent {
  i18n = inject(TranslationService);

  // Active section jump navigation
  activeSection = signal<string>('arhitectura');

  // Architecture Simulation State
  simActiveStep = signal<number>(0);
  simScenario = signal<'catalog' | 'klarna' | 'auth'>('catalog');
  simIsRunning = signal<boolean>(false);

  // Dual Role Switcher (5.11.7)
  activeRole = signal<'admin' | 'standard'>('admin');

  // Auth Simulation (15.1)
  authTab = signal<'admin-register' | 'user-login'>('admin-register');
  registerName = signal<string>('Andrei Ionescu');
  registerEmail = signal<string>('andrei.ionescu@lab-exemplu.ro');
  registerDepartment = signal<string>('R&D Embedded Systems');
  registerRole = signal<'standard' | 'admin'>('standard');
  registerSuccess = signal<boolean>(false);
  registerFeedback = signal<string>('');

  loginUsername = signal<string>('andrei.ionescu');
  loginPassword = signal<string>('ParolaSigura2026!');
  loginSuccess = signal<boolean>(false);
  loginFeedback = signal<string>('');

  // Online Chat Simulation (5.11.8)
  chatChannel = signal<'direct' | 'group'>('direct');
  chatInput = signal<string>('');
  chatMessages = signal<ChatMessage[]>([
    {
      id: '1',
      sender: 'Ing. Mihai Radu (Suport Tehnic)',
      role: 'support',
      text: 'Salut Andrei! Verific specificația pentru placa de rețea 10GbE SFP+ cu controller Intel 82599ES. Este perfect compatibilă cu slotul PCIe 2.0 x8 din serverul tău 2U.',
      time: '14:22',
      channel: 'direct'
    },
    {
      id: '2',
      sender: 'Andrei Ionescu (Utilizator)',
      role: 'user',
      text: 'Mulțumesc! Am adăugat și 2 module transceiver DAC de 1 metru în rack builder.',
      time: '14:24',
      channel: 'direct'
    },
    {
      id: '3',
      sender: 'Alexandru Popa (Admin R&D)',
      role: 'admin',
      text: 'Salutare echipei! Am aprobat comanda cu finanțare Klarna în 3 rate pentru noile plăci de dezvoltare RISC-V și modulul LoRaWAN.',
      time: '11:15',
      channel: 'group'
    },
    {
      id: '4',
      sender: 'Elena Dobre (Inginer IoT)',
      role: 'user',
      text: 'Excelent, avem nevoie de senzori BME280 calibrați pentru stațiile de monitorizare a mediului.',
      time: '11:18',
      channel: 'group'
    }
  ]);

  scrollToSection(id: string) {
    this.activeSection.set(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  runSimulation(scenario: 'catalog' | 'klarna' | 'auth') {
    this.simScenario.set(scenario);
    this.simIsRunning.set(true);
    this.simActiveStep.set(1);

    setTimeout(() => {
      this.simActiveStep.set(2);
      setTimeout(() => {
        this.simActiveStep.set(3);
        setTimeout(() => {
          this.simActiveStep.set(4);
          setTimeout(() => {
            this.simIsRunning.set(false);
          }, 900);
        }, 900);
      }, 900);
    }, 900);
  }

  handleAdminRegister() {
    if (!this.registerName() || !this.registerEmail()) {
      return;
    }
    const username = this.registerEmail().split('@')[0];
    this.registerSuccess.set(true);
    if (this.i18n.isRo()) {
      this.registerFeedback.set(`Utilizatorul "${this.registerName()}" a fost înregistrat cu succes. A fost expediat un e-mail automat către ${this.registerEmail()} cu datele de cont (Username temporar: ${username}, Parolă generată cu hash criptografic bcrypt).`);
    } else {
      this.registerFeedback.set(`User "${this.registerName()}" successfully registered. An automated email was sent to ${this.registerEmail()} with login credentials (Temporary username: ${username}, bcrypt-hashed temporary password).`);
    }
  }

  handleUserLogin() {
    if (!this.loginUsername() || !this.loginPassword()) {
      return;
    }
    this.loginSuccess.set(true);
    if (this.i18n.isRo()) {
      this.loginFeedback.set(`Autentificare reușită pentru utilizatorul "${this.loginUsername()}". Hash-ul parolei a fost verificat cu succes în Data Access Layer, iar sesiunea a primit token JWT cu rolul: ${this.activeRole() === 'admin' ? 'Administrator' : 'Utilizator Standard'}.`);
    } else {
      this.loginFeedback.set(`Login successful for user "${this.loginUsername()}". Password hash verified against Data Access Layer, session issued JWT token with role: ${this.activeRole() === 'admin' ? 'Administrator' : 'Standard User'}.`);
    }
  }

  sendChatMessage() {
    const text = this.chatInput().trim();
    if (!text) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: this.activeRole() === 'admin' ? 'Administrator Sistem' : 'Andrei Ionescu (Utilizator)',
      role: this.activeRole() === 'admin' ? 'admin' : 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      channel: this.chatChannel()
    };

    this.chatMessages.update(msgs => [...msgs, newMessage]);
    this.chatInput.set('');

    // Automated simulation response after 1 second
    setTimeout(() => {
      const isDirect = this.chatChannel() === 'direct';
      const reply: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: isDirect ? 'Ing. Mihai Radu (Suport Tehnic)' : 'Bot Sistem Homelab',
        role: isDirect ? 'support' : 'system',
        text: isDirect
          ? (this.i18n.isRo() 
              ? 'Mesajul a fost recepționat de departamentul tehnic. Parametrii configurației hardware au fost confirmați ca fiind compatibili.'
              : 'Message received by the technical team. Hardware parameters have been verified and confirmed compatible.')
          : (this.i18n.isRo()
              ? 'Notificare de grup: Un nou echipament a fost propus în rack-ul comun de testare.'
              : 'Group notice: A new hardware unit was proposed in the shared testing rack.'),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        channel: this.chatChannel()
      };
      this.chatMessages.update(msgs => [...msgs, reply]);
    }, 1000);
  }

  getFilteredMessages(): ChatMessage[] {
    return this.chatMessages().filter(m => m.channel === this.chatChannel());
  }
}
