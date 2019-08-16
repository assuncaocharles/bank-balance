export enum HTTP_RESPONSE_CODES {
  FORBIDDEN = 401,
  INTERNAL_ERROR = 500,
  SUCCESS = 200,
  CREATED = 201,
  NOT_FOUND = 404
}

export enum MESSAGES {
  NEGATIVE_BALANCE = 'Saldo insuficiente',
  SUCCESS_OPERATION = 'Operação realizada com sucesso',
  USER_NOT_FOUND = 'Usuário não encontrado, realize um depósito para esse criar o usuário automaticamente',
  NOT_ALLOWED = 'Operação não permitida',
  INTERNAL_ERROR = 'Desculpe, aconteceu algume erro na sua transação. Por favor, tente novamente.'
}
