import Environment from '@Classes/Environment';
import Utility from '@Utils/Utility';
import XmlBuilder from '@Classes/XmlBuilder';
import BaseNFE from '../BaseNFe/BaseNFe.js';
import { GenericObject } from '@Protocols/index.js';
import { AxiosInstance, AxiosResponse } from 'axios';

class ConsultarCadastro extends BaseNFE {
    constructor(environment: Environment, utility: Utility, xmlBuilder: XmlBuilder, axios: AxiosInstance) {
        super(environment, utility, xmlBuilder, 'consultarCadastro', axios);
    }

    protected gerarXml(chave: string): string {
        return this.gerarXmlConsultaProtocolo(chave);
    }

    protected salvaArquivos(xmlConsulta: string, responseInJson: GenericObject, xmlRetorno: AxiosResponse<any, any>, options?: Record<string, any>): void {}

    /**
     * Método utilitário para criação do XML a partir de um Objeto
     */
    gerarXmlConsultaProtocolo(chave: string) {
        try {
            const { nfe: { ambiente, versaoDF }, dfe: { UF } } = this.environment.getConfig();

            const xmlObject = {
                $: {
                    versao: versaoDF,
                    xmlns: 'http://www.portalfiscal.inf.br/nfe'
                },
                tpAmb: ambiente,
                xServ: 'CONSULTAR',
                chNFe: chave,
            }

            return this.xmlBuilder.gerarXml(xmlObject, 'consSitNFe')
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

}

export default ConsultarCadastro;
