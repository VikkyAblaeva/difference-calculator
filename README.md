### Hexlet tests and linter status:
[![Actions Status](https://github.com/VikkyAblaeva/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/VikkyAblaeva/frontend-project-lvl2/actions) [![Actions Status](https://github.com/VikkyAblaeva/frontend-project-lvl2/workflows/eslint&test-check/badge.svg)](https://github.com/VikkyAblaeva/frontend-project-lvl2/actions) [![Maintainability](https://api.codeclimate.com/v1/badges/3498a7dabc23049c33f8/maintainability)](https://codeclimate.com/github/VikkyAblaeva/frontend-project-lvl2/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/3498a7dabc23049c33f8/test_coverage)](https://codeclimate.com/github/VikkyAblaeva/frontend-project-lvl2/test_coverage)

## Вычислитель отличий :collision:

### Краткое описание: :page_facing_up:

- [X] Программа сравнивает два конфигурационных файла с расширениями .json, .yml, .yaml;
- [X] Cli-утилита принимает два аргумента — пути до этих файлов;
- [X] Результат сравнения файлов может выводиться в разных форматах.

### Системные требования: :computer:

- [X] Поддерживаемая версия Node.js - 17;

- Начало работы:
    - git clone https://github.com/VikkyAblaeva/frontend-project-lvl2
    - cd frontend-project-lvl2
    - make install
    - sudo npm link

### Установка:

<a href="https://asciinema.org/a/WyvfEAiZTkrg8omKWT8Cvzq2d" target="_blank"><img src="https://asciinema.org/a/WyvfEAiZTkrg8omKWT8Cvzq2d.svg" width="500"></a>

### Вызов справки (команда gendiff -h):

<a href="https://asciinema.org/a/8hqhNIXNh04FwJcU6e0yfnLhW" target="_blank"><img src="https://asciinema.org/a/8hqhNIXNh04FwJcU6e0yfnLhW.svg" width="500"></a>

### Пример работы со стандартным форматером Stylish (команда gendiff filepath1 filepath2):

<a href="https://asciinema.org/a/ejbsPkOpE3Y4WrEfY4IWiARUc" target="_blank"><img src="https://asciinema.org/a/ejbsPkOpE3Y4WrEfY4IWiARUc.svg" width="500"></a>

### Пример работы с форматером Plain (команда gendiff -f plain filepath1 filepath2):

<a href="https://asciinema.org/a/8ImVmrUf3X69gIRWVQjtlBtkM" target="_blank"><img src="https://asciinema.org/a/8ImVmrUf3X69gIRWVQjtlBtkM.svg" width="500"></a>

### Пример работы с форматером JSON (команда gendiff -f json filepath1 filepath2):

<a href="https://asciinema.org/a/HpgK0u1X5rB76tRTQJ3kfabDQ" target="_blank"><img src="https://asciinema.org/a/HpgK0u1X5rB76tRTQJ3kfabDQ.svg" width="500"></a>
