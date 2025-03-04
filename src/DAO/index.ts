import { QueryTypes } from 'sequelize';

import sequelize from '../config/database';

interface ResponseFromDatabase { 
    status: number;
    body: any;
}
const DAO = { 
    async insertData(query: string): Promise<ResponseFromDatabase> { 
        try { 
            await sequelize.authenticate(); 

            try { 
                const result = await sequelize.query(query, { type: QueryTypes.INSERT });

                return { 
                    status: 200, 
                    body: result 
                };

            } catch (error) {
                return { 
                    status: 500, 
                    body: error 
                };
            }
        } catch (error) {
            return { 
                status: 500, 
                body: error 
            };
        }
    },
    async selectData(query: string): Promise<ResponseFromDatabase> { 
        try { 
            await sequelize.authenticate(); 

            try { 
                const result = await sequelize.query(query, { type: QueryTypes.SELECT });

                return { 
                    status: 200, 
                    body: result 
                };

            } catch (error) {
                return { 
                    status: 500, 
                    body: error 
                };
            }
        } catch (error) {
            return { 
                status: 500, 
                body: error 
            };
        }
    },
    async updateData(query: string): Promise<ResponseFromDatabase> { 
        try { 
            await sequelize.authenticate(); 

            try { 
                const result = await sequelize.query(query, { type: QueryTypes.UPDATE });

                return { 
                    status: 204, 
                    body: result 
                };

            } catch (error) {
                return { 
                    status: 500, 
                    body: error 
                };
            }
        } catch (error) {
            return { 
                status: 500, 
                body: error 
            };
        }
    },

    async deleteData(query: string): Promise<ResponseFromDatabase> { 
        try { 
            await sequelize.authenticate(); 

            try { 
                const result = await sequelize.query(query, { type: QueryTypes.DELETE });

                return { 
                    status: 204, 
                    body: result 
                };

            } catch (error) {
                return { 
                    status: 500, 
                    body: error 
                };
            }
        } catch (error) {
            return { 
                status: 500, 
                body: error 
            };
        }
    }
}

export default DAO;