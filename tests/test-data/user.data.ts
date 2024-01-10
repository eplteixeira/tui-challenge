interface Person {
  firstname: string,
  lastname: string,
  postalcode: string
};

const commonUser: Person = {
  firstname: 'Emanuel',
  lastname: 'Teixeira',
  postalcode: '1050-522'
};

export const People = {
  regularUser: commonUser
}