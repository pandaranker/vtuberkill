{
	/**全局卡牌 */
	let { game, ui, get, ai, lib, _status } = vkCore
	let groupCard = {
		type: 'faction',
		fullskin: true
	}
	lib.card = {
		list: [],
		//石头剪刀布
		pss_paper: {
			type: 'pss',
			fullskin: true,
		},
		pss_scissor: {
			type: 'pss',
			fullskin: true,
		},
		pss_stone: {
			type: 'pss',
			fullskin: true,
		},
		//区域废弃标志
		feichu_equip1: {
			type: "equip",
			subtype: "equip1",
		},
		feichu_equip2: {
			type: "equip",
			subtype: "equip2",
		},
		feichu_equip3: {
			type: "equip",
			subtype: "equip3",
		},
		feichu_equip4: {
			type: "equip",
			subtype: "equip4",
		},
		feichu_equip5: {
			type: "equip",
			subtype: "equip5",
		},
		disable_judge: {},
		//势力卡牌
		group_wei: { ...groupCard },
		group_shu: { ...groupCard },
		group_wu: { ...groupCard },
		group_qun: { ...groupCard },
		group_key: { ...groupCard },
		group_jin: { ...groupCard },
		group_holo: { ...groupCard, },
		group_nijisanji: { ...groupCard, },
		group_VirtuaReal: { ...groupCard, },
		group_upd8: { ...groupCard, },
		group_paryi: { ...groupCard, },
		group_kagura: { ...groupCard, },
		group_nanashi: { ...groupCard, },
		group_psp: { ...groupCard, },
		group_asoul: { ...groupCard, },
		group_nori: { ...groupCard, },
		group_vwp: { ...groupCard, },
		group_chaos: { ...groupCard, },
		group_xuyan: { ...groupCard, },
		group_xuefeng: { ...groupCard, },
		group_Providence: { ...groupCard, },
		group_HappyEl: { ...groupCard, },
		group_RedC: { ...groupCard, },
		group_painter: { ...groupCard, },
		group_singer: { ...groupCard, },

		//仅出现在战略模式中的势力
		group_MiyaFam: { ...groupCard, },
		group_bingtang: { ...groupCard, },
	}
}