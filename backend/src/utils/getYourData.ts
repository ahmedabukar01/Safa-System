export const getYourData = (user: any) => {

    if(user.role === 'SUPER_ADMIN'){
        return user.id;
    }

    else if(user.role === 'ADMIN'){
        return user.id;
    }

    else if(user.role === 'USER'){
        return user.adminBy || ""; // may be improve here
    }
    else {
        return null
    }

}