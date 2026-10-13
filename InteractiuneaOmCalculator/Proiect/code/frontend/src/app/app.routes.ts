import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { StripeGatewayComponent } from './pages/stripe-gateway/stripe-gateway.component';
import { KlarnaGatewayComponent } from './pages/klarna-gateway/klarna-gateway.component';
import { OrderConfirmationComponent } from './pages/order-confirmation/order-confirmation.component';
import { OrderTrackingComponent } from './pages/order-tracking/order-tracking.component';
import { TermsComponent } from './pages/terms/terms.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { CookiePolicyComponent } from './pages/cookies/cookies.component';
import { LabBuilderComponent } from './pages/lab-builder/lab-builder.component';
import { ComparisonComponent } from './pages/comparison/comparison.component';
import { AnpcComponent } from './pages/anpc/anpc.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Vexera' },
  { path: 'produse', component: CatalogComponent, title: 'Catalog | Vexera' },
  { path: 'categorie/:categorySlug', component: CatalogComponent, title: 'Categorie Hardware | Vexera' },
  { path: 'categorii/:categorySlug', redirectTo: 'categorie/:categorySlug' },
  { path: 'categorii', component: CatalogComponent, title: 'Categorii Hardware | Vexera' },
  { path: 'produs/:slug', component: ProductDetailComponent, title: 'Produs | Vexera' },
  { path: 'produs/:slug/:tab', component: ProductDetailComponent, title: 'Produs | Vexera' },
  { path: 'build-your-lab', component: LabBuilderComponent, title: 'Build Your Lab | Vexera' },
  { path: 'lab-builder', redirectTo: 'build-your-lab' },
  { path: 'rack-builder', redirectTo: 'build-your-lab' },
  { path: 'compara', component: ComparisonComponent, title: 'Comparator Echipamente | Vexera' },
  { path: 'compare', redirectTo: 'compara' },
  { path: 'checkout', component: CheckoutComponent, title: 'Finalizare Comandă | Vexera' },
  { path: 'checkout/klarna-gateway', component: KlarnaGatewayComponent, title: 'Klarna Pay Later | Vexera' },
  { path: 'checkout/stripe-gateway', component: StripeGatewayComponent, title: 'Stripe Payments | Vexera' },
  { path: 'checkout/netopia-gateway', redirectTo: 'checkout/stripe-gateway' },
  { path: 'checkout/confirmare', component: OrderConfirmationComponent, title: 'Confirmare Comandă | Vexera' },
  { path: 'urmarire-comanda', component: OrderTrackingComponent, title: 'Urmărire Expediere | Vexera' },
  { path: 'termeni-si-conditii', component: TermsComponent, title: 'Termeni și Condiții | Vexera' },
  { path: 'terms', redirectTo: 'termeni-si-conditii' },
  { path: 'confidentialitate', component: PrivacyComponent, title: 'Confidențialitate & GDPR | Vexera' },
  { path: 'gdpr', redirectTo: 'confidentialitate' },
  { path: 'politica-de-confidentialitate', redirectTo: 'confidentialitate' },
  { path: 'politica-cookies', component: CookiePolicyComponent, title: 'Politica privind Modulele Cookie | Vexera' },
  { path: 'cookies', redirectTo: 'politica-cookies' },
  { path: 'anpc', component: AnpcComponent, title: 'Protecția Consumatorilor (ANPC & SOL) | Vexera' },
  { path: 'protectia-consumatorului', redirectTo: 'anpc' },
  { path: '**', redirectTo: '' }
];
