import { Response } from 'express';

export function ResponseInternalError(res: Response, error: any) {
    res.status(500).json({ msg: 'Internal Error', error });
    console.log(error);
}

export function getAge(birthday: Date): number {
    const birthdayDate = new Date(birthday);
    const date = new Date();

    let age = date.getFullYear() - birthdayDate.getFullYear();
    const month = date.getMonth() - birthdayDate.getMonth();

    if (month < 0 || (month === 0 && date.getDate() < birthday.getDate() + 1)) {
        age--;
    }

    return age;
}

export function calculateIMC(weight: number, height: number): number {
    return weight / Math.pow(height / 100, 2);
}

export function calculateGEB(weight: number, height: number, imc: number, gender: string, age: number): number {
    if (imc < 25) {
        if (gender === 'F') {
            return 655 + 9.6 * weight + 1.8 * height - 4.7 * age;
        } else {
            return 66.47 + 13.75 * weight + 5 * height - 6.78 * age;
        }
    } else {
        let temp = 10 * weight + 6.25 * height - 5 * age;

        if (gender === 'F') {
            temp -= 161;
        } else {
            temp += 5;
        }

        return temp;
    }
}

export function calculateGET(geb: number, af: number, imc: number): number {
    let temp = geb + (geb / 100) * af;

    if (imc < 18.5) {
        return temp + 100;
    } else if (imc < 25) {
        return temp;
    } else {
        return temp + (geb / 100) * 10;
    }
}
