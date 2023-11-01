import axios, { AxiosError } from 'axios';

const apiUrl = 'http://localhost:8080/api/v1'

const token = 'Bearer ' + localStorage.getItem('authToken');

//user Api call

export const sigupUser = async (firstName: string, lastName: string, email: string, password: string) => {
    try {

        const res = await axios.post(`${apiUrl}/user/signup`,
            { firstName, lastName, email, password }, {
            headers: {
                'Content-Type': 'application/json',
            },
        },)

        return res;
    } catch (err) {
        if (err instanceof AxiosError && err.response) {
            throw {
                firstName: err?.response.data?.firstName,
                lastName: err?.response.data?.lastName,
                email: err?.response.data?.email,
                password: err?.response.data?.password,
                message: err?.response.data?.errorMessage
            };
        } else {
            throw err;
        }
    }
}

export const siginUser = async (email: string, password: string) => {
    try {

        const res = await axios.post(`${apiUrl}/user/signin`,
            { email, password }, {
            headers: {
                'Content-Type': 'application/json',
            },
        },)

        return res;
    } catch (err) {
        if (err instanceof AxiosError && err.response) {
            throw {
                email: err?.response?.data?.email,
                password: err?.response?.data?.password,
                message: err?.response?.data?.errorMessage
            };
        } else {
            throw err;
        }
    }
}

export const getUser = async () => {
    try {
        const res = await axios.get(`${apiUrl}/user/current-user`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            })

        return res;
    } catch (err) {

        if (err instanceof AxiosError && err.response) {
            throw {
                message: err?.response?.data?.errorMessage
            };
        } else {
            throw err;
        }
    }
}

export const updateUserById = async (firstName: string, lastName: string, email: string, id: string | undefined) => {
    try {
        const res = await axios.put(`${apiUrl}/user/update/${id}`,
            { firstName, lastName, email },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            })

        return res;
    } catch (err) {

        if (err instanceof AxiosError && err.response) {
            throw {
                firstName: err?.response?.data.firstName,
                lastName: err?.response?.data.lastName,
                email: err?.response?.data.email,
                message: err?.response?.data?.errorMessage
            };
        } else {
            throw err;
        }
    }
}

export const deleteUserById = async (id: string | undefined) => {
    try {
        const res = await axios.delete(`${apiUrl}/user/delete/${id}`,
            {
                headers: {
                    'Authorization': token
                }
            })

        return res;
    } catch (err) {

        if (err instanceof AxiosError && err.response) {
            throw {
                message: err?.response?.data?.errorMessage
            };
        } else {
            throw err;
        }
    }
}

export const getAllUser = async (offset?: number) => {
    try {
        const queryParams = [];
        if (offset !== undefined && offset !== null) {
            queryParams.push(`offset=${offset}`);
        }
        const res = await axios.get(`${apiUrl}/user/alluser?${queryParams}`,
            {
                headers: {
                    'Authorization': token
                }
            })

        return res;
    } catch (err) {

        if (err instanceof AxiosError && err.response) {
            throw {
                message: err?.response?.data?.errorMessage
            };
        } else {
            throw err;
        }
    }
}

export const getDashBoardData = async () => {
    try {
        const res = await axios.get(`${apiUrl}/user/admin/dashboard`,
            {
                headers: {
                    'Authorization': token
                }
            })
        return res;

    } catch (err) {
        if (err instanceof AxiosError && err.response) {
            throw {
                message: err?.response?.data?.message
            };
        } else {
            throw err;
        }
    }
}

export const uploadeUserImage = async (formData: FormData, id: string) => {
    try {
        const res = await axios.post(`${apiUrl}/user/upload-user-img/${id}`, formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': token
                }
            })

        return res;
    } catch (err) {
        if (err instanceof AxiosError && err.response) {
            throw {
                message: err?.response?.data?.errorMessage
            };
        } else {
            throw err;
        }
    }
}

export const logoutuser = async () => {
    try {
        const res = await axios.get(`${apiUrl}/user/logout`,
            {
                headers: {
                    'Authorization': token
                }
            })
        return res;
    } catch (err) {
        if (err instanceof AxiosError && err.response) {
            throw {
                message: err?.response?.data
            };
        } else {
            throw err;
        }
    }
}



//Category Api Call

export const createCategory = async (cateName: string) => {
    try {
        const res = await axios.post(`${apiUrl}/category/create`, { cateName },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            })

        return res;
    } catch (err) {

        if (err instanceof AxiosError && err.response) {
            throw {
                message: err?.response?.data?.errorMessage
            };
        } else {
            throw err;
        }
    }
}

export const updateCategory = async (cateName?: string, id?: string) => {
    try {
        const res = await axios.put(`${apiUrl}/category/update/${id}`, { cateName },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            })

        return res;
    } catch (err) {

        if (err instanceof AxiosError && err.response) {
            throw {
                message: err?.response?.data?.errorMessage
            };
        } else {
            throw err;
        }
    }
}

export const getAllCategory = async () => {
    try {
        const res = await axios.get(`${apiUrl}/category/all`)
        return res;
    } catch (err) {

        if (err instanceof AxiosError && err.response) {
            throw {
                message: err?.response?.data?.errorMessage
            };
        } else {
            throw err;
        }
    }
}

export const getAllAdminCategory = async (offset?: number) => {
    const queryParams = [];
    if (offset !== undefined && offset !== null) {
        queryParams.push(`offset=${offset}`);
    }
    try {
        const res = await axios.get(`${apiUrl}/category/admin/all?${queryParams.join('&')}`,
            {
                headers: {
                    'Authorization': token
                }
            }
        )
        return res;
    } catch (err) {

        if (err instanceof AxiosError && err.response) {
            throw {
                message: err?.response?.data?.errorMessage
            };
        } else {
            throw err;
        }
    }
}

export const getCategoryById = async (id?: string) => {
    try {
        const res = await axios.get(`${apiUrl}/category/${id}`,
            {
                headers: {
                    'Authorization': token
                }
            }
        )

        return res;
    } catch (err) {

        if (err instanceof AxiosError && err.response) {
            throw {
                message: err?.response?.data?.errorMessage
            };
        } else {
            throw err;
        }
    }
}



export const deleteCategory = async (id: string) => {
    try {
        const res = await axios.delete(`${apiUrl}/category/delete/${id}`,
            {
                headers: {
                    'Authorization': token
                }
            }
        )

        return res;
    } catch (err) {
        if (err instanceof AxiosError && err.response) {
            throw {
                message: err?.response?.data?.errorMessage
            };
        } else {
            throw err;
        }
    }
}


//post Api call

export const createPost = async (formData: FormData) => {
    try {
        const res = await axios.post(`${apiUrl}/post/create`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': token
                }
            })

        return res;
    } catch (err) {

        if (err instanceof AxiosError && err.response) {
            throw {
                message: err?.response?.data?.errorMessage
            };
        } else {
            throw err;
        }
    }
}

export const updatePost = async (title: string, subtitle: string, description: string, postId?: string) => {
    try {
        const res = await axios.put(`${apiUrl}/post/update/${postId}`,
            { title, subtitle, description },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            })

        return res;
    } catch (err) {
        if (err instanceof AxiosError && err.response) {
            throw {
                message: err?.response?.data?.errorMessage
            };
        } else {
            throw err;
        }
    }
}

export const uploadePostImage = async (formData: FormData, id: string) => {
    try {
        const res = await axios.put(`${apiUrl}/post/update-img/${id}`, formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': token
                }
            })

        return res;
    } catch (err) {
        console.log(err)
        if (err instanceof AxiosError && err.response) {
            throw {
                message: err?.response?.data
            };
        } else {
            throw err;
        }
    }
}

export const getAllPost = async (category?: string, offset?: number) => {
    const queryParams = [];
    if (category !== undefined && category !== null) {
        queryParams.push(`category=${category}`);
    }
    if (offset !== undefined && offset !== null) {
        queryParams.push(`offset=${offset}`);
    }
    try {
        const res = await axios.get(`${apiUrl}/post/all?${queryParams}`)

        return res;
    } catch (err) {
        console.log(err)
        if (err instanceof AxiosError && err.response) {
            throw {
                message: err?.response?.data?.errorMessage
            };
        } else {
            throw err;
        }
    }
}

export const getLatestPost = async (offset?: number) => {
    try {
        const queryParams = [];

        if (offset !== undefined && offset !== null) {
            queryParams.push(`offset=${offset}`);
        }
        const res = await axios.get(`${apiUrl}/post/latestPost?${queryParams}`)
        return res;
    } catch (err) {

        if (err instanceof AxiosError && err.response) {
            throw {
                message: err?.response?.data?.errorMessage
            };
        } else {
            throw err;
        }
    }
}

export const getPostById = async (postId: string | undefined) => {
    try {
        const res = await axios.get(`${apiUrl}/post/${postId}`)
        return res;
    } catch (err) {
        if (err instanceof AxiosError && err.response) {
            throw {
                message: err?.response?.data?.errorMessage
            };
        } else {
            throw err;
        }
    }
}

export const deletePostById = async (postId: string) => {
    try {
        const res = await axios.delete(`${apiUrl}/post/delete/${postId}`,
            {
                headers: {
                    'Authorization': token
                }
            })

        return res;
    } catch (err) {

        if (err instanceof AxiosError && err.response) {
            throw {
                message: err?.response?.data?.errorMessage
            };
        } else {
            throw err;
        }
    }
}

export const searchPost = async (searchKey: string, offset?: number) => {
    try {
        const queryParams = [];
        if (searchKey) {
            queryParams.push(`searchKey=${encodeURIComponent(searchKey)}`);
        }
        if (offset !== undefined && offset !== null) {
            queryParams.push(`offset=${offset}`);
        }

        const res = await axios.get(`${apiUrl}/post/search?${queryParams.join('&')}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            })

        return res;
    } catch (err) {

        if (err instanceof AxiosError && err.response) {
            throw {
                message: err?.response?.data?.errorMessage
            };
        } else {
            throw err;
        }
    }
}


//contact Api call

export const sendUserMessage = async (name: string, email: string, message: string) => {
    try {
        const res = await axios.post(`${apiUrl}/contact/send`, { name, email, message },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            })

        return res;
    } catch (err) {

        if (err instanceof AxiosError && err.response) {
            throw {
                message: err?.response?.data?.errorMessage
            };
        } else {
            throw err;
        }
    }
}

export const getAllUserMessage = async (offset?: number) => {
    try {
        const queryParams = [];
        if (offset !== undefined && offset !== null) {
            queryParams.push(`offset=${offset}`);
        }
        const res = await axios.get(`${apiUrl}/contact/allmessage?${queryParams.join('&')}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            })

        return res;
    } catch (err) {

        if (err instanceof AxiosError && err.response) {
            throw {
                message: err?.response?.data?.errorMessage
            };
        } else {
            throw err;
        }
    }
}

export const deleteUserMessage = async (id: string) => {
    try {
        const res = await axios.delete(`${apiUrl}/contact/delete/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            })

        return res;
    } catch (err) {

        if (err instanceof AxiosError && err.response) {
            throw {
                message: err?.response?.data?.errorMessage
            };
        } else {
            throw err;
        }
    }
}
