import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { CartDrawerComponent } from './components/cart-drawer/cart-drawer.component';
import { CommandPaletteComponent } from './components/command-palette/command-palette.component';
import { KeyboardShortcutsModalComponent } from './components/keyboard-shortcuts-modal/keyboard-shortcuts-modal.component';
import { AccessibilityModalComponent } from './components/accessibility-modal/accessibility-modal.component';
import { LabProfileModalComponent } from './components/lab-profile-modal/lab-profile-modal.component';
import { UiFeedbackOverlayComponent } from './components/ui-feedback-overlay/ui-feedback-overlay.component';
import { KeyboardShortcutsService } from './services/keyboard-shortcuts.service';
import { UiFeedbackService } from './services/ui-feedback.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    CartDrawerComponent,
    CommandPaletteComponent,
    KeyboardShortcutsModalComponent,
    AccessibilityModalComponent,
    LabProfileModalComponent,
    UiFeedbackOverlayComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  private shortcuts = inject(KeyboardShortcutsService);
  private uiFeedback = inject(UiFeedbackService);

  ngOnInit() {
    this.shortcuts.initListener();
    this.uiFeedback.initGlobalListeners();
  }

  onRouteActivate() {
    if (typeof document === 'undefined') return;
    const el = document.getElementById('route-transition-wrapper');
    if (el) {
      el.classList.remove('route-fade-enter');
      void el.offsetWidth;
      el.classList.add('route-fade-enter');
    }
  }
}
