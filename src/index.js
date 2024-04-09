import cognitoLib from '#lib/cognito';


const main = async () => {
    const data = await cognitoLib.getFromUserPool({
        UserPoolId: "us-east-2_bAkYeSmvd",
        Username: "21"
    })

    console.log("DATA:", data)
}



main()