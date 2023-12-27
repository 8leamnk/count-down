# countdown(카운트 다운)

> 분, 초 단위의 숫자를 입력하여 카운트 다운을 하는 프로젝트입니다.

## 기능 소개

1. 입력 기능

- 카운트 다운을 하고 싶은 시간(분, 초)을 입력합니다.
- 숫자만 입력이 가능하며, 0 또는 양의 정수만 입력이 가능합니다.
- 1초 이상 59분 59초 이하의 시간만 입력이 가능합니다.

2. 카운트 다운 시작 기능

- 시작 버튼을 누르면 입력한 시간을 기준으로 카운트 다운이 시작됩니다.
- 카운트 다운이 시작되면 입력한 시간이 1초씩 줄어듭니다.
- 카운트 다운 중에는 시작 버튼이 활성화 되지 않기 때문에 버튼을 누를 수 없습니다.

3. 일시 정지 / 재시작 기능

- 카운트 다운이 진행되는 동안만 활성화 되며, 이 때에만 버튼을 누를 수 있습니다.
- 카운트 다운을 일시 정지할 수 있습니다.
- 첫 번째 클릭은 일시 정지 버튼을 의미하며, 두 번째 클릭은 재시작을 의미합니다.
- 일시 정지 후 버튼을 클릭하면 카운트 다운으로 인해 감소된 시간부터 다시 카운트 다운이 시작됩니다.

4. 초기화 기능

- 설정한 입력 시간을 초기화 하기 위해, 카운트 다운 중에 완전히 종료하기 위해 필요한 버튼입니다.
- 클릭하면 시작 중, 일시 정지 중, 재시작 중과 상관 없이 카운트 다운이 모두 완전히 종료됩니다.
- 카운트 다운이 `00:00`으로 완전히 종료되었을 때에도 해당 기능이 자동으로 발생됩니다.

5. 현재 카운트 다운 시간 표시

- 현재 카운트 다운 되고 있는 시간이 화면으로 표시됩니다.
- `00:00` 형태로 표시되며, 이는 `분:초`를 의미합니다.
- 1의 자리 수일 때는 `01` 형태로 표시됩니다.

```
예) 7분 1초 -> 07:01
```

## 활용 예시

- 시험 시간에 화면을 띄워 수험생들에게 남은 시간을 알려주고자 할 때 유용합니다.
- 중요한 약속(회의, 세미나, 컨퍼런스 등)의 시작 시간이 얼마 남았는지에 대해 많은 사람들에게 알려주고자 할 때 유용합니다.
