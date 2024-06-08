import { useEffect, useState } from "react";
import { UsuarioDTO } from "../http/dto/UsuarioDTO.ts";
import { Header } from "./Header.tsx";
import { ConsultarIngresosAPI } from "../http/api/ingreso/ConsultarIngresosAPI.ts";
import { IngresoDTO } from "../http/dto/IngresoDTO.ts";
import { EgresoDTO } from "../http/dto/EgresoDTO.ts";
import { Card, DonutChart, List, ListItem, BarChart } from '@tremor/react';
import { ConsultarEgresosAPI } from "../http/api/egreso/ConsultarEgresosAPI.ts";

export function Statistics() {
    const [ingresos, setIngresos] = useState<IngresoDTO[]>([]);
    const [egresos, setEgresos] = useState<EgresoDTO[]>([]);

    let usuarioDTO: UsuarioDTO = new UsuarioDTO();
    const user = localStorage.getItem('user');
    if (user) {
        usuarioDTO = new UsuarioDTO(JSON.parse(user));
    }

    useEffect(() => {
        if (usuarioDTO?.id) {
            const ingresoAPI = new ConsultarIngresosAPI(usuarioDTO?.id);
            const responseIngreso = ingresoAPI.consultarIngresos();
            responseIngreso.then((res) => {
                const ingresoData = res.data.data.map((ingresoData: IngresoDTO) => {
                    const ingreso = new IngresoDTO();
                    ingreso.id = ingresoData.id;
                    ingreso.nombre = ingresoData.nombre;
                    ingreso.descripcion = ingresoData.descripcion;
                    ingreso.monto = ingresoData.monto;
                    ingreso.periodicidad = ingresoData.periodicidad;
                    ingreso.categoria = ingresoData.categoria;
                    return ingreso;
                });
                setIngresos(ingresoData);
            });

            const egresoAPI = new ConsultarEgresosAPI(usuarioDTO?.id);
            const responseEgreso = egresoAPI.consultarEgresos();
            responseEgreso.then((res) => {
                const egresoData = res.data.data.map((egresoData: EgresoDTO) => {
                    const egreso = new EgresoDTO();
                    egreso.id = egresoData.id;
                    egreso.nombre = egresoData.nombre;
                    egreso.descripcion = egresoData.descripcion;
                    egreso.monto = egresoData.monto;
                    egreso.periodicidad = egresoData.periodicidad;
                    egreso.categoria = egresoData.categoria;
                    return egreso;
                });
                setEgresos(egresoData);
            });
        }
    }, [usuarioDTO?.id]);

    const colores = [
        'bg-cyan-500',
        'bg-blue-500',
        'bg-indigo-500',
        'bg-violet-500',
        'bg-fuchsia-500',
        'bg-orange-500',
        'bg-green-500',
        'bg-red-500',
        'bg-yellow-500',
        'bg-pink-500',
        'bg-lime-500',
        'bg-amber-500',
    ];

    const obtenerColorAleatorio = () => colores[Math.floor(Math.random() * colores.length)];

    const totalMontoIngresos = ingresos.reduce((acumulado, { monto }) => acumulado + monto, 0);

    const categoriasIngresoAcumuladas: { [key: string]: { nombre: string, monto: number, color: string } } = {};

    ingresos.forEach(({ categoria, monto }) => {
        if (categoriasIngresoAcumuladas[categoria.nombre]) {
            categoriasIngresoAcumuladas[categoria.nombre].monto += Number(monto);
        } else {
            categoriasIngresoAcumuladas[categoria.nombre] = {
                nombre: categoria.nombre,
                monto: Number(monto),
                color: obtenerColorAleatorio(),
            };
        }
    });

    const ingresoDatosPorCategoria = Object.values(categoriasIngresoAcumuladas).map(categoria => ({
        ...categoria,
        porcentaje: ((categoria.monto / totalMontoIngresos) * 100).toFixed(2) + '%'
    }));

    const ingresoDatos = ingresos.map(({ nombre, monto, }) => ({
        nombre: nombre,
        monto: Number(monto),
        color: obtenerColorAleatorio(),
        porcentaje: ((Number(monto) / totalMontoIngresos) * 100).toFixed(2) + '%'
    }));

    const coloresSinPrefijoSufijoIngresoDatos = ingresoDatos.map(item => item.color.replace(/^bg-/, '').replace(/-500$/, ''));
    const coloresSinPrefijoSufijoIngresoCategoria = ingresoDatosPorCategoria.map(item => item.color.replace(/^bg-/, '').replace(/-500$/, ''));

    //EGRESOS

    const totalMontoEgresos = egresos.reduce((acumulado, { monto }) => acumulado + monto, 0);

    const categoriasEgresoAcumuladas: { [key: string]: { nombre: string, monto: number, color: string } } = {};

    egresos.forEach(({ categoria, monto }) => {
        if (categoriasEgresoAcumuladas[categoria.nombre]) {
            categoriasEgresoAcumuladas[categoria.nombre].monto += Number(monto);
        } else {
            categoriasEgresoAcumuladas[categoria.nombre] = {
                nombre: categoria.nombre,
                monto: Number(monto),
                color: obtenerColorAleatorio(),
            };
        }
    });

    const egresoDatosPorCategoria = Object.values(categoriasEgresoAcumuladas).map(categoria => ({
        ...categoria,
        porcentaje: ((categoria.monto / totalMontoEgresos) * 100).toFixed(2) + '%'
    }));

    const egresoDatos = egresos.map(({ nombre, monto, }) => ({
        nombre: nombre,
        monto: Number(monto),
        color: obtenerColorAleatorio(),
        porcentaje: ((Number(monto) / totalMontoEgresos) * 100).toFixed(2) + '%'
    }));


    const ingresoVsEgreso = [{
        nombre: 'Ingresos',
        monto: totalMontoIngresos,
        color: 'bg-green-500',
        porcentaje: ((Number(totalMontoIngresos)/ (totalMontoIngresos+totalMontoEgresos))*100).toFixed(2) + '%'
    },
    {
        nombre: 'Egresos',
        monto: totalMontoEgresos,
        color: 'bg-red-500',
        porcentaje: ((Number(totalMontoEgresos)/ (totalMontoIngresos+totalMontoEgresos))*100).toFixed(2) + '%'
    }];

    const coloresSinPrefijoSufijoEgresoDatos = egresoDatos.map(item => item.color.replace(/^bg-/, '').replace(/-500$/, ''));
    const coloresSinPrefijoSufijoEgresoCategoria = egresoDatosPorCategoria.map(item => item.color.replace(/^bg-/, '').replace(/-500$/, ''));

    function classNames(...classes: string[]) { return classes.filter(Boolean).join(' '); }

    const currencyFormatter = (number: number | bigint) => { return '$' + Intl.NumberFormat('us').format(number).toString(); };

    return (
        <div>
            <Header />
            <div className="estadisticas__container">
                <section className="ingresos__charts">
                    <h2 className="income__titulo">Analisis de Ingresos</h2>
                    <div className="flex flex-wrap justify-evenly mx-4">
                        <div className="m-2 estadisticas__cards">
                            <Card className="sm:mx-auto sm:max-w-lg card">
                                <h3 className="text-tremor-default font-large text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                    Total de Ingresos Por Categoria
                                </h3>
                                <DonutChart
                                    className="mt-8"
                                    data={ingresoDatosPorCategoria}
                                    category="monto"
                                    variant="pie"
                                    index="nombre"
                                    valueFormatter={currencyFormatter}
                                    colors={coloresSinPrefijoSufijoIngresoCategoria}
                                    onValueChange={(v) => console.log(v)}
                                />
                                <p className="mt-8 flex items-center justify-between text-tremor-label text-tremor-content dark:text-dark-tremor-content">
                                    <span>Categoria</span>
                                    <span>Monto / Porcentaje</span>
                                </p>
                                <List className="mt-2 divide-y divide-gray-200 dark:divide-dark-tremor">
                                    {ingresoDatosPorCategoria.map((item) => (<ListItem key={item.nombre} className="space-x-6">
                                        <div className="flex items-center space-x-2.5 truncate">
                                            <span className={classNames(item.color, 'h-2.5 w-2.5 shrink-0 rounded-sm',)}
                                                aria-hidden={true} />
                                            <span className="truncate dark:text-dark-tremor-content-emphasis">
                                                {item.nombre}
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="font-medium tabular-nums text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                                {currencyFormatter(item.monto)}
                                            </span>
                                            <span className="rounded-tremor-small bg-tremor-background-subtle px-1.5 py-0.5 text-tremor-label font-medium tabular-nums text-tremor-content-emphasis dark:bg-dark-tremor-background-subtle dark:text-dark-tremor-content-emphasis">
                                                {item.porcentaje}
                                            </span>
                                        </div>
                                    </ListItem>))}
                                </List>
                            </Card>
                        </div>
                        <div className="m-2 estadisticas__cards">
                            <Card className="sm:mx-auto sm:max-w-lg card">
                                <h3 className="text-tremor-default font-large text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                    Total de Ingresos
                                </h3>
                                <DonutChart
                                    className="mt-8"
                                    data={ingresoDatos}
                                    category="monto"
                                    index="nombre"
                                    colors={coloresSinPrefijoSufijoIngresoDatos}
                                    valueFormatter={currencyFormatter}
                                    onValueChange={(v) => console.log(v)}
                                />
                                <p className="mt-8 flex items-center justify-between text-tremor-label text-tremor-content dark:text-dark-tremor-content">
                                    <span>Categoria</span>
                                    <span>Monto / Porcentaje</span>
                                </p>
                                <List className="mt-2 divide-y divide-gray-200 dark:divide-dark-tremor">
                                    {ingresoDatos.map((item) => (<ListItem key={item.nombre} className="space-x-6">
                                        <div className="flex items-center space-x-2.5 truncate">
                                            <span className={classNames(item.color, 'h-2.5 w-2.5 shrink-0 rounded-sm',)}
                                                aria-hidden={true} />
                                            <span className="truncate ligth:text-dark-tremor-content-emphasis">{item.nombre}
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="font-medium tabular-nums text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                                {currencyFormatter(item.monto)}
                                            </span>
                                            <span className="rounded-tremor-small bg-tremor-background-subtle px-1.5 py-0.5 text-tremor-label font-medium tabular-nums text-tremor-content-emphasis dark:bg-dark-tremor-background-subtle dark:text-dark-tremor-content-emphasis">
                                                {item.porcentaje}
                                            </span>
                                        </div>
                                    </ListItem>))}
                                </List>
                            </Card>
                        </div>
                    </div>
                </section>

                <section className="ingresos__charts">
                    <h2 className="income__titulo">Analisis de Egresos</h2>
                    <div className="flex flex-wrap justify-evenly mx-4">
                        <div className="m-2 estadisticas__cards">
                            <Card className="sm:mx-auto sm:max-w-lg card">
                                <h3 className="text-tremor-default font-large text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                    Total de Egresos Por Categoria
                                </h3>
                                <DonutChart
                                    className="mt-8"
                                    data={egresoDatosPorCategoria}
                                    category="monto"
                                    variant="pie"
                                    index="nombre"
                                    colors={coloresSinPrefijoSufijoEgresoCategoria}
                                    valueFormatter={currencyFormatter}
                                    onValueChange={(v) => console.log(v)}
                                />
                                <p className="mt-8 flex items-center justify-between text-tremor-label text-tremor-content dark:text-dark-tremor-content">
                                    <span>Categoria</span>
                                    <span>Monto / Porcentaje</span>
                                </p>
                                <List className="mt-2 divide-y divide-gray-200 dark:divide-dark-tremor">
                                    {egresoDatosPorCategoria.map((item) => (<ListItem key={item.nombre} className="space-x-6">
                                        <div className="flex items-center space-x-2.5 truncate">
                                            <span className={classNames(item.color, 'h-2.5 w-2.5 shrink-0 rounded-sm',)}
                                                aria-hidden={true} />
                                            <span className="truncate dark:text-dark-tremor-content-emphasis">
                                                {item.nombre}
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="font-medium tabular-nums text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                                {currencyFormatter(item.monto)}
                                            </span>
                                            <span className="rounded-tremor-small bg-tremor-background-subtle px-1.5 py-0.5 text-tremor-label font-medium tabular-nums text-tremor-content-emphasis dark:bg-dark-tremor-background-subtle dark:text-dark-tremor-content-emphasis">
                                                {item.porcentaje}
                                            </span>
                                        </div>
                                    </ListItem>))}
                                </List>
                            </Card>
                        </div>
                        <div className="m-2 estadisticas__cards">
                            <Card className="sm:mx-auto sm:max-w-lg card">
                                <h3 className="text-tremor-default font-large text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                    Total de Egresos
                                </h3>
                                <DonutChart
                                    className="mt-8"
                                    data={egresoDatos}
                                    category="monto"
                                    index="nombre"
                                    colors={coloresSinPrefijoSufijoEgresoDatos}
                                    valueFormatter={currencyFormatter}
                                    onValueChange={(v) => console.log(v)}
                                />
                                <p className="mt-8 flex items-center justify-between text-tremor-label text-tremor-content dark:text-dark-tremor-content">
                                    <span>Categoria</span>
                                    <span>Monto / Porcentaje</span>
                                </p>
                                <List className="mt-2 divide-y divide-gray-200 dark:divide-dark-tremor">
                                    {egresoDatos.map((item) => (<ListItem key={item.nombre} className="space-x-6">
                                        <div className="flex items-center space-x-2.5 truncate">
                                            <span className={classNames(item.color, 'h-2.5 w-2.5 shrink-0 rounded-sm',)}
                                                aria-hidden={true} />
                                            <span className="truncate ligth:text-dark-tremor-content-emphasis">{item.nombre}
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="font-medium tabular-nums text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                                {currencyFormatter(item.monto)}
                                            </span>
                                            <span className="rounded-tremor-small bg-tremor-background-subtle px-1.5 py-0.5 text-tremor-label font-medium tabular-nums text-tremor-content-emphasis dark:bg-dark-tremor-background-subtle dark:text-dark-tremor-content-emphasis">
                                                {item.porcentaje}
                                            </span>
                                        </div>
                                    </ListItem>))}
                                </List>
                            </Card>
                        </div>
                    </div>
                </section>

                <section className="ingresos__charts">
                    <h2 className="income__titulo">Ingresos VS Egresos</h2>
                    <div className="flex flex-wrap justify-evenly mx-4">
                        <div className="m-2 estadisticas__cards">
                            <Card className="sm:mx-auto sm:max-w-lg card">
                                <h3 className="text-tremor-default font-large text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                    Total de Ingresos y Egresos
                                </h3>
                                <DonutChart
                                    className="mt-8"
                                    data={ingresoVsEgreso}
                                    category="monto"
                                    index="nombre"
                                    colors={['green', 'red']}
                                    valueFormatter={currencyFormatter}
                                    onValueChange={(v) => console.log(v)}
                                />
                                <p className="mt-8 flex items-center justify-between text-tremor-label text-tremor-content dark:text-dark-tremor-content">
                                    <span>Categoria</span>
                                    <span>Monto / Porcentaje</span>
                                </p>
                                <List className="mt-2 divide-y divide-gray-200 dark:divide-dark-tremor">
                                    {ingresoVsEgreso.map((item) => (<ListItem key={item.nombre} className="space-x-6">
                                        <div className="flex items-center space-x-2.5 truncate">
                                            <span className={classNames(item.color, 'h-2.5 w-2.5 shrink-0 rounded-sm',)}
                                                aria-hidden={true} />
                                            <span className="truncate ligth:text-dark-tremor-content-emphasis">{item.nombre}
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="font-medium tabular-nums text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                                {currencyFormatter(item.monto)}
                                            </span>
                                            <span className="rounded-tremor-small bg-tremor-background-subtle px-1.5 py-0.5 text-tremor-label font-medium tabular-nums text-tremor-content-emphasis dark:bg-dark-tremor-background-subtle dark:text-dark-tremor-content-emphasis">
                                                {item.porcentaje}
                                            </span>
                                        </div>
                                    </ListItem>))}
                                </List>
                            </Card>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}