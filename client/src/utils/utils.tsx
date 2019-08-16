enum Operations {
  Deposit = 'DEPOSIT',
  Withdraw = 'WITHDRAW',
  Declined = 'DECLINED',
}

export function getTagColor(operation: string) {
  switch (operation) {
    case Operations.Deposit:
      return 'green';
    case Operations.Withdraw:
      return 'orange';
    case Operations.Declined:
      return 'red';
  }
}
