/* =========================================================================
   MODUL 10 CUSTOM ELEMENTS
   - SalamPengguna: Custom element untuk sapaan pengguna
   - KartuArtikel : Custom element untuk kartu artikel dengan state privat #like,
                    tombol Like, tombol Hapus, dan lifecycle callbacks
   ========================================================================= */

class SalamPengguna extends HTMLElement {
  connectedCallback() {
    const nama = this.getAttribute("nama") || "Tamu";
    this.textContent = `Halo, ${nama}! Selamat datang di blog.`;
  }
}
customElements.define("salam-pengguna", SalamPengguna);

class KartuArtikel extends HTMLElement {
  #like = 0; // State privat untuk jumlah like

  static get observedAttributes() { 
    return ["judul", "isi"]; 
  }
  connectedCallback() { 
    this.render(); 
  }
  attributeChangedCallback() {
    if (this.isConnected) {
      this.render();
    }
  }
  disconnectedCallback() {
    console.log("Komponen kartu-artikel telah dihapus dari halaman.");
  }
  render() {
    this.innerHTML = `
      <article class="kartu">
        <h3></h3>
        <p></p>
        <button class="btn-like">Like (${this.#like})</button>
        <button class="btn-hapus">Hapus</button>
      </article>
    `;

    this.querySelector("h3").textContent = this.getAttribute("judul") ?? "";
    this.querySelector("p").textContent  = this.getAttribute("isi")   ?? "";

    // Event listener untuk tombol Like di dalam komponen
    this.querySelector(".btn-like").addEventListener("click", () => {
      this.#like++;
      this.querySelector(".btn-like").textContent = `Like (${this.#like})`;
    });

    // Event listener untuk tombol Hapus di dalam komponen
    this.querySelector(".btn-hapus").addEventListener("click", () => {
      this.remove(); // Menghapus elemen dari DOM (memicu disconnectedCallback)
    });
  }
}

customElements.define("kartu-artikel", KartuArtikel);