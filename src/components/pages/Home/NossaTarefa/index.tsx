import localFont from "next/font/local";
import Image from "next/image";
import BirdImage from "../../../../assets/images/passaro.png";
import { ItemTarefa } from "./ItemTarefa";
const myFont = localFont({ src: "../../fonts/MADE_Gentle.otf" });

export function NossaTarefa() {
  return (
    <section className="xl:mt-20" id="como-funciona">
      <div className="flex-col flex xl:flex-row max-w-[1312px] mx-auto px-4 align-cen justify-between gap-11">
        <div className="flex-1">
          <h2 className={`${myFont.className} mb-6 text-4xl text-dark-text`}>
            Nossa tarefa
          </h2>
          <h3 className="mb-6 text-xl font-semibold text-light-text">
            Buscamos facilitar o encontro de animais que estão sendo doados e
            precisam de um lar.
          </h3>

          <ul className="flex flex-col gap-6">
            <ItemTarefa
              label="Ao escolher seu pet em nossa plataforma, você irá entrar em
              contato com o responsável atual pelo pet."
            />

            <ItemTarefa
              label="Em nossa plataforma, você pode cadastrar o pet a ser doado
              informando as informações devidas."
            />
            <ItemTarefa
              label="Na nossa plataforma, ao escolher seu pet, você entrará em
              contato com o responsável atual pelo animal."
            />
          </ul>
        </div>

        <div>
          <Image src={BirdImage} alt="Pássaro image" className="h-fit mx-auto xl:mr-auto" />
        </div>
      </div>
    </section>
  );
}
