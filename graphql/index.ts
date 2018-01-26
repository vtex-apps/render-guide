export const resolvers = {
  Query: {
    sampleStaticResolver: (_, body) => {
      console.log(body)
      return {
        result: 'static with param: ' + body.param
      }
    }
  }
}
