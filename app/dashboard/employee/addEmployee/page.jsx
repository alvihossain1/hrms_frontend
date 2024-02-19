"use client"
import React from 'react'
import { toast } from 'react-toastify';

export default function AddEmployee() {

    function submitForm(){
        toast.success("Registration Successful!");
        toast.error("The Form has not been submitted!");
        toast.warning("Warning!");
        toast.info("Fields are missing");
    }

    return (
        <div>
            <div className="grid grid-cols-12 gap-x-1.5 gap-y-3 md:gap-x-4 md:gap-y-10 rounded-xl text-slate-800 p-3 md:py-12 md:px-12 w-full md:w-10/12 mx-auto">
                <div className="col-span-12">
                    <h2 className="my-auto">Employee Registration</h2>
                </div>
                <div className="col-span-12 md:col-span-6">
                    <div className="flex flex-col w-full">
                        <label className="my-1">First Name</label>
                        <input
                            className="border border-2 border-slate-300 py-2 px-2.5 text-slate-800 caret-purple-500 focus:outline-none focus:border-purple-500"
                            type="text" />
                    </div>
                </div>
                <div className="col-span-12 md:col-span-6">
                    <div className="flex flex-col w-full">
                        <label className="my-1">Last Name</label>
                        <input
                            className="border border-2 border-slate-300 py-2 px-2.5 text-slate-800 caret-purple-500 focus:outline-none focus:border-purple-500"
                            type="text" />
                    </div>
                </div>
                <div className="col-span-12 md:col-span-4 lg:col-span-6">
                    <div className="flex flex-col w-full">
                        <label className="my-1">Address</label>
                        <input
                            className="border border-2 border-slate-300 py-2 px-2.5 text-slate-800 caret-purple-500 focus:outline-none focus:border-purple-500"
                            type="text" />
                    </div>
                </div>
                <div className="col-span-12 md:col-span-4 lg:col-span-3">
                    <div className="flex flex-col w-full">
                        <label className="my-1">State</label>
                        <select
                            className="cursor-pointer border border-2 border-slate-300 py-2 px-2.5 text-slate-800 caret-purple-500 focus:outline-none focus:border-purple-500">
                            <option className="cursor-pointer text-slate-800">Dhaka</option>
                            <option className="cursor-pointer text-slate-800">Sylhet</option>
                            <option className="cursor-pointer text-slate-800">Chittagong</option>
                            <option className="cursor-pointer text-slate-800">XXX</option>
                        </select>
                    </div>
                </div>
                <div className="col-span-12 md:col-span-4 lg:col-span-3">
                    <div className="flex flex-col w-full">
                        <label className="my-1">Zip</label>
                        <input
                            className="border border-2 border-slate-300 py-2 px-2.5 text-slate-800 caret-purple-500 focus:outline-none focus:border-purple-500"
                            type="text" />
                    </div>
                </div>
                <div className="col-span-12 md:col-span-6">
                    <div className="flex flex-col w-full">
                        <label className="my-1">Email</label>
                        <input
                            className="border border-2 border-slate-300 py-2 px-2.5 text-slate-800 caret-purple-500 focus:outline-none focus:border-purple-500"
                            type="email" />
                    </div>
                </div>
                <div className="col-span-12 md:col-span-6">
                    <div className="flex flex-col w-full">
                        <label className="my-1">Password</label>
                        <input
                            className="border border-2 border-slate-300 py-2 px-2.5 text-slate-800 caret-purple-500 focus:outline-none focus:border-purple-500"
                            type="password" />
                    </div>
                </div>
                <div className="col-span-12">
                    <div className="flex items-center gap-3 pl-1 w-full mt-2">
                        <input id="checkbox1" className="w-5 h-5 border border-purple-500 cursor-pointer"
                            type="checkbox" />
                        <label htmlFor="checkbox1">Terms and conditions</label>
                        <small className="text-slate-500">I accept all legal stuffs!</small>
                    </div>
                </div>
                <div className="col-span-12 flex justify-end">
                    <button onClick={() => {submitForm()}} className="py-3 px-4 bg-slate-700 text-slate-50 shadow-md shadow-slate-500 hover:bg-purple-500 transition-all duration-300 ease-linear">Register Employee</button>
                </div>
            </div>
            <p className="text-slate-800">
                reprehenderit nisi dolorem! Pariatur doloremque cumque optio eligendi. Soluta totam nam sint cum voluptatum nostrum, accusantium similique corporis fugit ullam officiis minima temporibus numquam tempore perspiciatis iste aliquid vero consequuntur provident velit, eos, sunt ducimus beatae. Cupiditate quisquam dicta illo, voluasfasfasfasf dit alias, et consectetur, dolorem nihil. Repellendus, asperiores non eveniet sapiente error facilis voluptatum consequatur voluptate ducimus dicta officia! Quia sit odio doloribus! Aliquid velit nisi fugit exercitationem cumque odio! Ipsa labore vitae totam atque iste numquam maxime et sint rem. Ex porro repellat facere blanditiis cupiditate eligendi harum rem! Maiores officia possimus voluptas iste nobis quod modi deleniti id incidunt itaque dolor et repellendus, facilis earum fugiat quos laborum praesentium ea quam atque sunt adipisci consequuntur reiciendis laudantium. Doloremque, animi! Id, quod est debitis nemo incidunt enim eaque libero cumque laborum a ducimus praesentium quidem excepturi neque culpa veniam explicabo. Accusantium velit, incidunt repudiandae earum aspernatur nam magni vitae debitis, exercitationem eius cum labore eum fugiat ea rem architecto, quisquam eveniet possimus ex quam tempora id! Doloremque, qui recusandae aspernatur eius error id vel, totam culpa magnam iste ullam, itaque sunt! Velit deserunt ea natus, dolor facilis tenetur molestias quas rerum eveniet voluptatum perferendis, dolorem labore earum corporis! Adipisci sequi unde voluptas molestias dolor fuga quibusdam nam excepturi, soluta harum aspernatur architecto! Dolorem adipisci deleniti nam harum est corrupti debitis et repellendus, necessitatibus, sunt nesciunt praesentium pariatur reiciendis fugit dolorum a quia esse atque cum quibusdam sint voluptatibus repellat culpa nemo. Sunt sed odio, consequuntur distinctio beatae expedita suscipit quia cum doloremque! Libero eum, ipsum distinctio repellat necessitatibus assumenda quibusdam error laudantium similique laboriosam dignissimos eligendi rerum nulla. Totam deleniti incidunt illum dolor nulla, dolorum debitis aperiam magni ex ab minima vero necessitatibus non natus harum. Suscipit, sint aperiam! Aspernatur sequi nobis tenetur dicta sunt explicabo animi, quibusdam molestiae expedita! Eius, eos sequi. Nulla animi sequi tenetur necessitatibus doloribus quam laboriosam, molestias iste dolorum vitae sapiente commodi consequatur voluptatum officia iusto magni repellendus obcaecati et fuga. Dicta facilis inventore velit ullam architecto totam maxime, voluptatibus earum sint quidem ea nam, cum unde quos officiis, reiciendis impedit incidunt nemo perspiciatis repudiandae. In eveniet animi perspiciatis sed ex exercitationem architecto voluptatum quod ut sit eos ad velit minus vitae, ratione, dolores dolorem similique dicta dolorum officiis libero inventore possimus nihil. Amet ex a sed. Amet molestiae tenetur animi aliquam fuga repellat itaque facilis molestias consequuntur perspiciatis reprehenderit, quas obcaecati doloremque nihil rem ex voluptate eius voluptatem sed, doloribus ducimus quia nemo dolor. Dolorum, est! Asperiores deleniti, ipsam quam consectetur cumque minus quidem laudantium corrupti blanditiis vel voluptates laboriosam libero iste odio? Dignissimos voluptate recusandae voluptatem aliquid, eligendi, saepe asperiores obcaecati, quidem quam amet fugiat perspiciatis quod ab. Illum nihil reiciendis ullam recusandae, voluptatum qui similique necessitatibus maiores, tempora incidunt rerum blanditiis quam nemo beatae at sint autem, laboriosam accusamus id. Cupiditate ullam quibusdam ad? Reprehenderit fugit deleniti illum ea vitae sed facere consequatur ad? Quasi aperiam recusandae aspernatur dolores ea vitae, totam, doloribus autem itaque cumque corporis consequatur maiores eos! Officiis velit quisquam eum saepe veritatis, odio voluptates suscipit a cumque expedita harum tempora debitis impedit laudantium placeat, autem tempore accusantium omnis rerum officia dolore fugiat! Tempora eos fugiat consequuntur similique deleniti perspiciatis nisi ratione ad vero pariatur voluptatum at nihil, atque molestias quibusdam! Sed, labore ad ea quam unde corrupti natus nobis laudantium saepe animi eos delectus. Eum laudantium reiciendis natus voluptas molestias vel totam recusandae nisi. Maiores tenetur sed sapiente ut ad? Aspernatur, iste temporibus excepturi eligendi officiis doloremque expedita aperiam voluptatum corrupti perspiciatis sunt laborum delectus magnam, impedit eius dolor molestias sequi quaerat perferendis neque saepe! Aliquid perferendis pariatur minus, veniam animi similique assumenda libero minima, explicabo ipsam, unde facilis error soluta. Cumque consectetur incidunt ducimus pariatur dicta facilis minima similique placeat mollitia tempore, iusto dolores eius, harum soluta adipisci corrupti delectus quis? Tempore neque, totam, possimus architecto consequatur non dignissimos impedit nobis quas corporis vel alias consectetur praesentium aperiam ipsum maxime voluptas illum ab consequuntur! Consequatur rem cum reprehenderit omnis repellat facilis pariatur nam eos ab, perspiciatis fuga, hic dicta optio excepturi amet odit deserunt maiores tenetur? Quaerat omnis voluptatibus voluptate illum corporis ut voluptates non? Dolorem, officia. Molestias et rem numquam voluptatum quae laborum reiciendis facilis iste, facere in cumque quis velit officiis quidem quam totam cum! Assumenda id similique culpa distinctio, est, molestiae hic, sequi doloremque modi ipsum minima sed suscipit atque officia tenetur nobis voluptate odio dolore? Consequuntur perspiciatis, odio culpa magnam at, reiciendis ea dolore architecto libero officia non officiis rerum. Dicta ducimus enim minus voluptas. Eligendi deleniti perspiciatis iusto nihil tempore porro fugit quibusdam recusandae, quasi, neque deserunt quod itaque, aut ullam? Eos necessitatibus repudiandae delectus eligendi reiciendis libero dolore! Quos reiciendis voluptatibus commodi dolor delectus fugit incidunt culpa recusandae minima, atque voluptates, et quam vitae? Perspiciatis, expedita velit! Perferendis debitis quae tempora dicta, explicabo asperiores, voluptatem minus nisi cumque dolorum, est fugiat? Natus soluta sunt, molestias provident quis odit nobis aperiam numquam optio! Nostrum facere, aut cumque mollitia ad unde. Possimus tenetur cum vel explicabo hic fugit autem dicta inventore magnam, nemo eaque quos quis aliquid deleniti repudiandae eligendi distinctio non voluptates doloribus suscipit, porro excepturi vitae! Itaque dolorum explicabo ipsa accusantium dolor.
            </p>
            
        </div>

    );
}
