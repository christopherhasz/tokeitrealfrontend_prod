import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Zurück zur Startseite
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12">
          <h1 className="text-4xl font-light text-gray-900 dark:text-gray-100 mb-8">
            Datenschutzerklärung
          </h1>

          <div className="space-y-8 text-gray-700 dark:text-gray-300">
            <section>
              <h2 className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-4">
                1. Verantwortlicher
              </h2>
              <div className="space-y-2">
                <p className="font-medium">TokeItReal GbR</p>
                <p>vertreten durch die Gesellschafter Christopher Haß & Felix Behnke</p>
                <p>Waldstraße 21</p>
                <p>15345 Altlandsberg</p>
                <p>Deutschland</p>
                <p className="mt-4">E-Mail: info@tokeitreal.com</p>
                <p>Web: tokeitreal.com</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-4">
                2. Allgemeine Hinweise zur Datenverarbeitung
              </h2>
              <div className="space-y-3">
                <p>
                  Diese Website dient ausschließlich der <strong>Präsentation des Projekts „TokeItReal"</strong>.
                </p>
                <p>
                  Es werden <strong>keine Finanz- oder Vertriebsleistungen angeboten</strong>.
                </p>
                <p>
                  Personenbezogene Daten werden nur insoweit verarbeitet, wie dies technisch erforderlich oder durch Ihre freiwillige Einwilligung geschieht.
                </p>
                <p>
                  Eine automatisierte Profilbildung findet nicht statt.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-4">
                3. Erhebung und Speicherung personenbezogener Daten beim Besuch der Website
              </h2>
              <p className="mb-4">
                Beim Aufruf dieser Website werden technisch notwendige Daten („Server-Logfiles") erhoben, darunter:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>IP-Adresse des anfragenden Endgeräts</li>
                <li>Datum und Uhrzeit des Zugriffs</li>
                <li>Name und URL der abgerufenen Datei</li>
                <li>Referrer-URL</li>
                <li>verwendeter Browser und Betriebssystem</li>
              </ul>
              <p className="mt-4">
                Diese Verarbeitung erfolgt zur Sicherstellung des reibungslosen Betriebs der Website (Art. 6 Abs. 1 lit. f DSGVO).
              </p>
              <p>
                Die Logdaten werden in der Regel nach spätestens sieben Tagen gelöscht.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-4">
                4. Cookies und Einwilligungsmanagement
              </h2>
              <div className="space-y-3">
                <p>
                  Diese Website verwendet nur technisch notwendige Cookies sowie – nach Ihrer Zustimmung – Cookies von Drittanbietern (z. B. YouTube).
                </p>
                <p>
                  Über das Einwilligungsmanagement-Banner können Sie auswählen, welche Cookies Sie zulassen möchten, insbesondere für das Laden von YouTube-Videos.
                </p>
                <p>
                  Ihre Einwilligung können Sie jederzeit widerrufen, indem Sie Ihre Cookie-Einstellungen in Ihrem Browser anpassen oder die Funktion auf unserer Website nutzen.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-4">
                5. Einbindung externer Inhalte (YouTube)
              </h2>
              <div className="space-y-3">
                <p>
                  Auf unserer Website können YouTube-Videos über die Plattform <strong>youtube-nocookie.com</strong> eingebunden sein.
                </p>
                <p>
                  Diese Videos werden erst geladen, wenn Sie dem Laden aktiv zustimmen (Consent-Banner).
                </p>
                <p>
                  Beim Laden eines Videos werden Daten (z. B. IP-Adresse) an YouTube/Google übertragen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).
                </p>
                <p>
                  Weitere Informationen zum Datenschutz bei YouTube finden Sie unter:{' '}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    https://policies.google.com/privacy
                  </a>
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-4">
                6. Ihre Rechte als betroffene Person
              </h2>
              <p className="mb-3">
                Sie haben das Recht auf:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Auskunft über Ihre gespeicherten personenbezogenen Daten (Art. 15 DSGVO)</li>
                <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
                <li>Löschung Ihrer Daten (Art. 17 DSGVO)</li>
                <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
                <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
                <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
                <li>Widerruf erteilter Einwilligungen (Art. 7 Abs. 3 DSGVO)</li>
              </ul>
              <p className="mt-4">
                Zur Ausübung dieser Rechte oder bei Fragen zum Datenschutz wenden Sie sich bitte an:{' '}
                <a
                  href="mailto:info@tokeitreal.com"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  info@tokeitreal.com
                </a>
              </p>
              <p className="mt-4">
                Sie haben zudem das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-4">
                7. Datensicherheit
              </h2>
              <p>
                Wir verwenden technische und organisatorische Sicherheitsmaßnahmen, um Ihre Daten gegen zufällige oder vorsätzliche Manipulationen, Verlust, Zerstörung oder den Zugriff unberechtigter Personen zu schützen.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-4">
                8. Änderungen dieser Datenschutzerklärung
              </h2>
              <p>
                Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf anzupassen, um sie an geänderte Rechtslagen oder Website-Funktionen anzupassen. Die jeweils aktuelle Version ist stets auf dieser Seite abrufbar.
              </p>
            </section>

            <p className="text-sm text-gray-600 dark:text-gray-400 mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              Stand: November 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
