
# Projektowanie Aplikacji Mobilnych

## Spis Treści

- [Wymagania Wstępne](#wymagania-wstępne)
- [Instalacja](#instalacja)
- [Uruchomienie Aplikacji](#uruchomienie-aplikacji)
- [Uruchomienie na Emulatorze Android](#uruchomienie-na-emulatorze-android)
- [Uruchomienie na Symulatorze iOS](#uruchomienie-na-symulatorze-ios)
- [Uruchomienie w Przeglądarce](#uruchomienie-w-przeglądarce)
- [Uruchomienie na Fizycznym Urządzeniu](#uruchomienie-na-fizycznym-urządzeniu)
- [Dodatkowe Informacje](#dodatkowe-informacje)
- [Rozwiązywanie Problemów](#rozwiązywanie-problemów)
- [Licencja](#licencja)

## Wymagania Wstępne

Przed rozpoczęciem pracy nad projektem upewnij się, że masz zainstalowane poniższe narzędzia:

1. **Node.js**

Upewnij się, że masz zainstalowaną najnowszą wersję Node.js. Możesz ją pobrać z [oficjalnej strony Node.js](https://nodejs.org/).

2. **Expo CLI**

Chociaż `expo` jest zainstalowane jako zależność projektu, zaleca się zainstalowanie **Expo CLI** globalnie dla łatwiejszego zarządzania projektami.

```bash
npm install -g expo-cli
```

lub używając **Yarn**:

```bash
yarn global add expo-cli
```

3. **Android Studio** (Opcjonalnie, dla rozwoju na Androida)

Potrzebne do uruchamiania emulatora Androida. Pobierz z [oficjalnej strony Android Studio](https://developer.android.com/studio).

4. **Xcode** (Opcjonalnie, dla rozwoju na iOS)

Wymagany do uruchamiania symulatora iOS. Możesz go pobrać z [Mac App Store](https://apps.apple.com/us/app/xcode/id497799835?mt=12).

## Instalacja

1. **Klonowanie Repozytorium**

Najpierw sklonuj repozytorium projektu na swój lokalny komputer:

```bash
git clone https://github.com/twoja-nazwa-uzytkownika/projektowanie-aplikacji-mobilnych.git
```

Przejdź do katalogu projektu:

```bash
cd projektowanie-aplikacji-mobilnych
```

2. **Instalacja Zależności**

Zainstaluj wszystkie niezbędne zależności projektu używając **npm** lub **Yarn**:

- Za pomocą **npm**:

```bash
npm install
```

- Za pomocą **Yarn**:

```bash
yarn install
```

## Uruchomienie Aplikacji

Projekt zawiera kilka skryptów, które ułatwiają uruchamianie aplikacji na różnych platformach.

### Uruchomienie na Emulatorze Android

Aby uruchomić aplikację na emulatorze Androida, użyj następującego polecenia:

```bash
npm run android
```

lub

```bash
yarn android
```

Upewnij się, że masz uruchomiony emulator Androida z **Android Studio** lub podłączone fizyczne urządzenie z włączonym trybem deweloperskim.

### Uruchomienie na Symulatorze iOS

Aby uruchomić aplikację na symulatorze iOS, użyj następującego polecenia:

```bash
npm run ios
```

lub

```bash
yarn ios
```

**Uwaga:** Aby korzystać z symulatora iOS, musisz mieć zainstalowane **Xcode** na swoim Macu.

### Uruchomienie w Przeglądarce

Aplikację można również uruchomić w przeglądarce internetowej za pomocą:

```bash
npm run web
```

lub

```bash
yarn web
```

### Uruchomienie na Fizycznym Urządzeniu

1. **Instalacja Expo Go**

Pobierz aplikację **Expo Go** na swoje urządzenie z [App Store](https://apps.apple.com/app/expo-go/id982107779) lub [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_US&gl=US).

2. **Uruchomienie Serwera Deweloperskiego**

W terminalu uruchom serwer deweloperski:

```bash
npm start
```

lub

```bash
yarn start
```

3. **Skanowanie Kodu QR**

Otwórz aplikację **Expo Go** na swoim urządzeniu, zeskanuj wyświetlony kod QR, aby uruchomić aplikację na fizycznym urządzeniu.

## Dodatkowe Informacje

- **TypeScript:** Projekt jest skonfigurowany do używania TypeScript, co zapewnia statyczne typowanie i lepszą jakość kodu.

- **Expo:** Używany jest framework Expo, który upraszcza proces tworzenia aplikacji mobilnych, oferując wiele gotowych funkcji i narzędzi.

- **React Native:** Aplikacja jest zbudowana na bazie React Native, co pozwala na tworzenie aplikacji natywnych dla Androida i iOS przy użyciu JavaScriptu.

## Rozwiązywanie Problemów

1. **Problemy z Uruchomieniem Emulatora Androida:**
    - Upewnij się, że masz zainstalowany i uruchomiony emulator Androida z **Android Studio**.
    - Sprawdź, czy zmienna środowiskowa **ANDROID_HOME** jest poprawnie ustawiona.

2. **Problemy z Symulatorem iOS:**
    - Upewnij się, że masz zainstalowane **Xcode**.
    - Otwórz Xcode przynajmniej raz, aby zakończyć konfigurację.

3. **Błędy Zależności:**
    - Spróbuj usunąć folder node_modules i ponownie zainstalować zależności:

```bash
rm -rf node_modules
npm install
```

lub

```bash
rm -rf node_modules
yarn install
```

4. **Problemy z Cache:**
    - Wyczyść cache Expo i uruchom ponownie serwer deweloperski:

```bash
npm start -- --reset-cache
```

lub

```bash
yarn start --reset-cache
```

## Licencja

Ten projekt jest objęty licencją **MIT**. Szczegóły można znaleźć w pliku [LICENSE](LICENSE).

Dziękujemy za korzystanie z projektu **Projektowanie Aplikacji Mobilnych**! Jeśli masz pytania lub napotkasz problemy, nie wahaj się skontaktować lub zgłosić issue w repozytorium.
